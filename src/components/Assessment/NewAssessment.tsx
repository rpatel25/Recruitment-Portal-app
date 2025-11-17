import React, { useState } from 'react';
import { SkillsForm } from './SkillsForm';

const skillOptions = [
  'React',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'Design',
  'Tailwind CSS',
];

export const NewAssessment = () => {
  const [assessmentMode, setAssessmentMode] = useState<'create' | 'saved'>(
    'create'
  );
  return (
    <>
      {/* Radio Buttons for assessment mode */}
      {/* <div className="flex items-center gap-8">
        <label className="flex items-center cursor-pointer gap-2">
          <input
            type="radio"
            name="assessmentMode"
            value="create"
            checked={assessmentMode === 'create'}
            onChange={() => setAssessmentMode('create')}
            className="peer sr-only"
          />
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2
                        ${
                          assessmentMode === 'create'
                            ? 'border-[#864CEF] bg-[#EEF2FF]'
                            : 'border-[#D1C4F7] bg-white'
                        }
                        `}
          >
            {assessmentMode === 'create' && (
              <span className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]"></span>
            )}
          </span>
          <span className="text-lg font-semibold text-black">
            Create new assessment
          </span>
        </label>
        <label className="flex items-center cursor-pointer gap-2">
          <input
            type="radio"
            name="assessmentMode"
            value="saved"
            checked={assessmentMode === 'saved'}
            onChange={() => setAssessmentMode('saved')}
            className="peer sr-only"
          />
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2
                        ${
                          assessmentMode === 'saved'
                            ? 'border-[#864CEF] bg-[#EEF2FF]'
                            : 'border-[#D1C4F7] bg-white'
                        }
                        `}
          >
            {assessmentMode === 'saved' && (
              <span className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]"></span>
            )}
          </span>
          <span className="text-lg font-semibold text-black">
            Use Saved Assessment.
          </span>
        </label>
      </div> */}
      <div className="flex flex-col gap-6 py-4">
        <SkillsForm
          options={skillOptions}
          onSubmit={(payload) => {
            const form = new FormData();
            form.append('assessment_name', payload.assessmentName);
            form.append('skills', payload.skills?.join());
            if (payload.file) {
              form.append('file', payload.file, payload.file.name);
            }
          }}
        />
      </div>
    </>
  );
};
