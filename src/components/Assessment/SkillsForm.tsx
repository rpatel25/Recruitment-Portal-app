import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Select, { components, OptionProps, StylesConfig } from 'react-select';

import { useCreateAssessementMutation } from '@/store/services/ApiRequest';
import { DropzoneUpload } from './DropzoneUpload';
import { Skills } from './Skills';
import { cn } from '@heroui/theme';

type SkillsFormProps = {
  options?: string[];
  onSubmit?: (payload: {
    assessmentName: string;
    skills: string[];
    file: File | null;
  }) => void;
};

interface OptionType {
  value: string;
  label: string;
}

const multiSelectOptions: OptionType[] = [
  { value: 'mcq', label: 'MCQ' },
  { value: 'codingQuestions', label: 'Coding Questions' },
  { value: 'technicalQuestions', label: 'Technical questions' },
];

//  Create the custom Option component
const CustomOption = (props: OptionProps<OptionType, true>) => {
  const { isSelected, label } = props;
  return (
    // Use the default Option component to get styles and event handlers
    <components.Option {...props}>
      <div className="flex items-center border-none bottom-4">
        <input
          type="checkbox"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={isSelected}
          onChange={() => null} // The library handles the actual selection
        />
        <label className="ml-3 text-gray-900">{label}</label>
      </div>
    </components.Option>
  );
};

const customStyles: StylesConfig<OptionType, true> = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#FFFFFF'
      : state.isFocused
      ? '#E0E7FF'
      : '#FFFFFF',
    color: '#FFFFFF',
  }),
};

export const SkillsForm = ({ options = [], onSubmit }: SkillsFormProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [assessmentName, setAssessmentName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [noofquestions, setNoOfQuestions] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<readonly OptionType[]>(
    []
  );
  const router = useRouter();

  const [errors, setErrors] = useState<{
    assessmentName?: string;
    skills?: string;
    file?: string;
    noofquestions?: string;
    assesmentType?: string[];
  }>({});

  // RTK Query mutation hook - returns [trigger, {status...}]
  const [createAssessment, { isLoading, isSuccess, isError, error }] =
    useCreateAssessementMutation();

  const handleFileAccepted = (f: File | null) => {
    setFile(f);
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const validate = () => {
    const e: {
      assessmentName?: string;
      skills?: string;
      file?: string;
      noofquestions?: string;
      assessmentType?: string;
    } = {};
    if (!assessmentName.trim())
      e.assessmentName = 'Assessment name is required.';
    else if (assessmentName.trim().length < 2)
      e.assessmentName = 'Enter at least 2 characters.';

    if (selected.length === 0) e.skills = 'Select at least one skill';
    if (noofquestions === '0' || '')
      e.noofquestions = 'Please enter number of questions';
    if (!file) e.file = 'Please upload a PDF (max 2MB).';
    if (selectedOptions.length === 0)
      e.assessmentType = 'Select at least one assessment type';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'assessmentName') {
      setAssessmentName(value);
      setErrors((prev) => ({ ...prev, assessmentName: undefined }));
    } else if (name === 'noofquestions') {
      setNoOfQuestions(value);
    } else if (name === 'file') {
      const f = files && files.length ? files[0] : null;
      setFile(f);
      setErrors((prev) => ({ ...prev, file: undefined }));
    } else if (name === 'skills') {
      setSelected((prev) => {
        if (prev.includes(value)) {
          const updated = prev.filter((s) => s !== value);
          return updated;
        } else {
          const updated = [...prev, value];
          return updated;
        }
      });
    } else if (name === 'assessmentType') {
      setSelectedOptions((prev) => {
        const updated = [...prev];
        return updated;
      });
    }
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    if (!file) {
      setErrors((prev) => ({
        ...prev,
        file: 'Please upload a PDF (max 2MB).',
      }));
    } else {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }

    if (!assessmentName.trim()) {
      setErrors((prev) => ({
        ...prev,
        assessmentName: 'Assessment name is required.',
      }));
    } else if (assessmentName.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        assessmentName: 'Enter at least 2 characters.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, assessmentName: undefined }));
    }

    if (selected.length === 0) {
      setErrors((prev) => ({ ...prev, skills: 'Select at least one skill.' }));
    } else {
      setErrors((prev) => ({ ...prev, skills: undefined }));
    }

    ev?.preventDefault();
    if (!validate()) return;

    const payload = {
      assessmentName: assessmentName.trim(),
      skills: selected,
      file,
      noofquestions,
      assessmentType: selectedOptions.map((opt) => opt.label),
    };

    if (onSubmit) onSubmit(payload);
    else console.log('submit Payload:', payload);
    console.log('Payload:', payload);

    try {
      const form = new FormData();
      form.append('assessment_name', payload.assessmentName);
      form.append('candidate_name', payload.assessmentName);
      form.append('no_of_questions', payload.noofquestions || '');
      payload.skills.forEach((s) => form.append('skills[]', s));
      form.append('skills', JSON.stringify(payload.skills));
      payload.assessmentType.forEach((t) => {
        return form.append('assessment_type', t);
      });
      if (payload.file) form.append('file', payload.file, payload.file.name);

      const resp = await createAssessment(form).unwrap();
      console.log('Create assessment response:', resp);
      // Navigate to ReviewQuestions with the assessment_id
      if (resp?.assessment_id) {
        router.push(`/review-questions/${resp.assessment_id}`);
      }
    } catch (err) {
      console.error('Create assessment error:', err);
    }
  };

  const canSubmit = useMemo(() => {
    return (
      assessmentName.trim().length >= 2 &&
      selected.length > 0 &&
      parseInt(noofquestions.trim()) > 0 &&
      selectedOptions.length > 0 &&
      file !== null &&
      !errors.assessmentName &&
      !errors.skills &&
      !errors.file &&
      !errors.noofquestions &&
      !errors.assesmentType
    );
  }, [assessmentName, selected, file, noofquestions, selectedOptions, errors]);

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <DropzoneUpload
        className="mb-6 text-black"
        onFileAccepted={handleFileAccepted}
      />

      {errors.file && (
        <div className="text-sm text-red-600 mb-4">{errors.file}</div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <Skills
          errors={errors}
          options={options}
          open={open}
          setOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assessment Name
          </label>
          <input
            type="text"
            name="assessmentName"
            value={assessmentName}
            onChange={handleChange}
            placeholder="Type the assessment name"
            className={cn(
              'w-full px-3 py-2 h-12',
              'border rounded-xl placeholder-gray-400 text-sm text-black',
              errors.assessmentName ? 'border-red-400' : 'border-gray-200'
            )}
            aria-invalid={!!errors.assessmentName}
          />
          {errors.assessmentName && (
            <div className="text-sm text-red-600 mt-2">
              {errors.assessmentName}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            No of questions
          </label>
          <input
            name="noofquestions"
            type="number"
            min={0}
            value={noofquestions}
            onChange={handleChange}
            placeholder="Enter no of questions"
            className={cn(
              'w-full px-3 py-2 h-12',
              'border rounded-xl placeholder-gray-400 text-sm text-black',
              'border-gray-200'
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assessment Type
          </label>
          <Select<OptionType, true>
            isMulti
            options={multiSelectOptions}
            name="assessmentType"
            value={selectedOptions}
            onChange={(newValue) => setSelectedOptions(newValue)}
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CustomOption }} // Use your custom component
            placeholder="Choose from dropdown"
            className={cn(
              'w-full px-3 py-2 h-12',
              'border rounded-xl placeholder-gray-400 text-sm text-black',
              'border-gray-200'
            )}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            'px-4 py-2 rounded-xl text-white cursor-pointer',
            'bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {!isSuccess && !isLoading && (
            <div className="flex justify-center gap-2">
              <img src="/icons/rightarrow.svg" alt="rightarrow" />
              Submit
            </div>
          )}
          {!isSuccess && isLoading && (
            <div className="flex justify-center gap-2">
              {/* <img src="/icons/loading.svg" alt="loading spinner" /> */}
              Generating Assessments
            </div>
          )}
          {isSuccess && !isLoading && (
            <div className="flex justify-center gap-2">
              {/* <img src="/icons/loading.svg" alt="loading spinner" /> */}
              Review Questions
            </div>
          )}
        </button>
        <button
          type="button"
          className={cn(
            'px-4 py-2 rounded-xl',
            'bg-white hover:opacity-90',
            'border border-gray-200'
          )}
        >
          <div className="flex justify-center gap-2 text-blue-800">
            <img src="/icons/close_icon_blue.svg" alt="close_icon_blue" />
            Cancel
          </div>
        </button>
      </div>
    </form>
  );
};
