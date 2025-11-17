import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button, cn } from '@heroui/react';
import { MCQPopup } from './MCQPopup';

import {
  useGetAssessmentsByIdQuery,
  useGenerateAssessmentLinkMutation,
  useAddQuestionToAssessmentMutation,
  useUpdateQuestionInAssessmentMutation,
  useDeleteQuestionFromAssessmentMutation,
} from '@/store/services/ApiRequest';

import { IAssessmentQuestins } from '@/types/assessment.type';

interface ReviewQuestionsProps {
  assessment_id: string;
}

// Local interface for MCQ options in the edit form
interface MCQOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

const MCQOptionsInitialValue: MCQOption[] = [
  { id: 1, text: '', isCorrect: false },
  { id: 2, text: '', isCorrect: false },
  { id: 3, text: '', isCorrect: false },
  { id: 4, text: '', isCorrect: false },
];

export const ReviewQuestions = React.memo(
  ({ assessment_id }: ReviewQuestionsProps) => {
    const [selectLevel, setSelectLevel] =
      React.useState<string>('Level 1 (MCQ only)');
    const [editMode, setEditMode] = React.useState(false);
    const [editingQuestion, setEditingQuestion] =
      React.useState<IAssessmentQuestins | null>(null);
    const [showMCQPopup, setShowMCQPopup] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState('');
    const [mcqOptions, setMcqOptions] = React.useState<MCQOption[]>(
      MCQOptionsInitialValue
    );
    const [isAssessmentSaved, setIsAssessmentSaved] = React.useState(false);

    const {
      data: responseData,
      isLoading,
      error,
    } = useGetAssessmentsByIdQuery(assessment_id, {
      // Skip query if assessment_id is undefined or empty
      skip: !assessment_id,
    });

    // Log any errors for debugging
    if (error) {
      console.error('Error fetching questions:', error);
    }

    // Refetch data when mutations complete
    const { refetch } = useGetAssessmentsByIdQuery(assessment_id, {
      skip: !assessment_id,
    });

    // Filter questions based on selected level
    const filteredQuestions = React.useMemo(() => {
      if (!responseData?.questions) return [];

      return responseData.questions.filter((question) => {
        const questionType = question.type?.toLowerCase();
        if (selectLevel === 'Level 1 (MCQ only)') {
          return questionType === 'mcq';
        } else {
          // For Level 2, show both 'Coding Questions' and 'Technical questions'
          return (
            questionType === 'coding questions' ||
            questionType === 'technical questions'
          );
        }
      });
    }, [responseData?.questions, selectLevel]);

    const handleAddNewQuestion = () => {
      setEditMode(true);
      setEditingQuestion(null);
      if (selectLevel === 'Level 1 (MCQ only)') {
        setShowMCQPopup(true);
      } else {
        setCurrentQuestion('');
      }
    };

    const [generateLink] = useGenerateAssessmentLinkMutation();

    const handleSaveAssessment = async (assessment_id: string) => {
      console.log('Save assessment with ID:', assessment_id);
      try {
        const result = await generateLink(assessment_id);
        if ('data' in result) {
          const generatedLink = result.data?.link_id;
          console.log(`Assessment link generated: ${generatedLink}`);
          setIsAssessmentSaved(true);
        }
      } catch (error) {
        console.error('Error generating assessment link:', error);
      }
    };

    const handleEditQuestion = (question_id: string) => {
      const question = responseData?.questions?.find(
        (q) => q.question_id === question_id
      );
      if (question) {
        setEditingQuestion(question);
        setCurrentQuestion(question.question);
        if (selectLevel === 'Level 1 (MCQ only)') {
          setShowMCQPopup(true);
          // Convert API options format to our MCQOption format
          const formattedOptions = (question.options || []).map(
            (opt, index) => ({
              id: index + 1,
              text: opt,
              isCorrect:
                question.metadata?.answer_guidance?.includes(opt) || false,
            })
          );
          setMcqOptions(formattedOptions);
        }
        setEditMode(true);
      }
    };

    const handleDeleteQuestion = async (question_id: string) => {
      setIsAssessmentSaved(false); // Reset saved state when questions change
      try {
        const question = responseData?.questions?.find(
          (q) => q.question_id === question_id
        );

        if (question) {
          const result = await deleteQuestionMutation({
            ...question,
            question_id,
            assessment_id,
          });

          if ('data' in result) {
            await refetch(); // Refetch questions after successful deletion
          }
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        // Add a toast or alert here to show the error to the user
        alert('Failed to delete question. Please try again.');
      }
    };

    const [updateQuestionMutation] = useUpdateQuestionInAssessmentMutation();
    const [addQuestionMutation] = useAddQuestionToAssessmentMutation();
    const [deleteQuestionMutation] = useDeleteQuestionFromAssessmentMutation();

    const handleSaveQuestion = async () => {
      setIsAssessmentSaved(false); // Reset saved state when questions change
      const newQuestionData = {
        question_id: editingQuestion?.question_id || '',
        question: currentQuestion,
        type: selectLevel === 'Level 1 (MCQ only)' ? 'MCQ' : 'Coding Questions',
        options:
          selectLevel === 'Level 1 (MCQ only)'
            ? mcqOptions.map((opt) => opt.text)
            : [],
        answer: null,
        metadata: {
          id:
            editingQuestion?.metadata?.id ||
            `q1-${Math.random().toString(36).substr(2, 9)}`,
          title: currentQuestion,
          difficulty: 'medium',
          time_limit_min: 5,
          question_type:
            selectLevel === 'Level 1 (MCQ only)' ? 'mcq' : 'coding',
          prompt: currentQuestion,
          starter_code: null,
          assets: [],
          expected_concepts: [],
          answer_guidance:
            selectLevel === 'Level 1 (MCQ only)'
              ? mcqOptions.find((opt) => opt.isCorrect)?.text || ''
              : '',
          rubric_id: `rubric${(responseData?.questions?.length ?? 0) + 1}`,
        },
        result: null,
      };

      try {
        if (selectLevel === 'Level 1 (MCQ only)') {
          setShowMCQPopup(false);
        }

        if (editingQuestion) {
          // Update existing question
          const result = await updateQuestionMutation({
            ...newQuestionData,
            assessment_id,
          });
          if ('data' in result) {
            await refetch(); // Refetch questions after successful update
          }
        } else {
          // Add new question
          const result = await addQuestionMutation({
            ...newQuestionData,
            assessment_id,
          });
          if ('data' in result) {
            await refetch(); // Refetch questions after successful add
          }
        }

        setEditMode(false);
        setEditingQuestion(null);
        setCurrentQuestion('');
      } catch (error) {
        console.error('Error saving question:', error);
        // Here show an error message to the user
      }
    };

    const handleOptionChange = (optionId: number, text: string) => {
      setMcqOptions((options) =>
        options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt))
      );
    };

    const handleCorrectOptionChange = (optionId: number) => {
      setMcqOptions((options) =>
        options.map((opt) => ({ ...opt, isCorrect: opt.id === optionId }))
      );
    };

    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          <span className="ml-2">Loading questions...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-center text-red-600">
          "Error loading questions. Please try again."
        </div>
      );
    }

    if (!responseData?.questions?.length) {
      return (
        <div className="p-4 text-center text-gray-600">
          No questions available for this assessment.
        </div>
      );
    }

    if (!filteredQuestions.length) {
      return (
        <div className="p-4 text-center text-gray-600">
          No {selectLevel === 'Level 1 (MCQ only)' ? 'MCQ' : 'coding'} questions
          available.
        </div>
      );
    }

    return (
      <>
        <div className="rounded-xl border-2 border-blue-100 relative">
          <div className="p-3 flex flex-col gap-3 h-[62vh] overflow-scroll border-b-2 border-blue-100">
            <div className="p-3 border-2 border-blue-100 rounded-xl flex justify-between">
              <Dropdown
                value={selectLevel}
                onChange={(e) => setSelectLevel(e.value)}
                options={[
                  'Level 1 (MCQ only)',
                  'Level 2 (Coding/Technical Questions)',
                ].map((level) => ({ label: level, value: level }))}
                optionLabel="label"
                optionValue="value"
                className={cn(
                  'w-90 h-9 px-2 flex items-center',
                  'border border-solid border-[#3B4CBF] rounded-lg',
                  'text-[#323130] text-sm font-medium'
                )}
              />
              <div className="flex gap-3">
                {isAssessmentSaved ? (
                  <div className="p-2 rounded-xl w-45 h-10 gap-2 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] text-white flex items-center opacity-70 cursor-not-allowed">
                    <img
                      className="w-5 h-7"
                      src="/icons/assessment_saved_icon.svg"
                      alt="save_white"
                    />
                    Assessment Saved
                  </div>
                ) : (
                  <div
                    className="p-2 rounded-xl w-45 h-10 gap-2 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] text-white flex items-center cursor-pointer"
                    onClick={() => handleSaveAssessment(assessment_id)}
                  >
                    <img
                      className="w-5 h-7"
                      src="/icons/save_white.svg"
                      alt="save_white"
                    />
                    Save assessment
                  </div>
                )}
              </div>
            </div>
            {filteredQuestions.map((question) => (
              <div
                key={question.question_id}
                className="p-3 border-2 border-blue-100 rounded-xl flex justify-between items-center"
              >
                <div className="w-1/2">{question.question}</div>
                <div className="flex justify-center items-center gap-2">
                  <div
                    className="border-blue-800 border-1 rounded-xl p-1 flex justify-center items-center w-9 h-9 cursor-pointer"
                    onClick={() => handleEditQuestion(question.question_id)}
                  >
                    <img
                      className="w-5 h-5"
                      src="/icons/edit_blue.svg"
                      alt="edit_blue"
                    />
                  </div>
                  <Button
                    className="flex justify-between items-center border-red-600 border-1 rounded-xl p-3 w-25 h-9 text-red-600 font-medium cursor-pointer"
                    onClick={() => handleDeleteQuestion(question.question_id)}
                  >
                    <img
                      className="w-4 h-4"
                      src="/icons/delete_red_icon.svg"
                      alt="delete_red_icon"
                    />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl flex flex-col w-full gap-2">
            {selectLevel === 'Level 2 (Coding/Technical Questions)' &&
            editMode ? (
              <>
                <p className="w-full">Add/Edit Question</p>
                <div className="flex flex-row gap-2 justify-content-stretch items-center">
                  <textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your technical question"
                    className={cn(
                      'w-3/4 px-3 py-2',
                      'border rounded-xl placeholder-gray-400',
                      'min-h-[50px] resize-y text-sm border-gray-200'
                    )}
                  />
                  <Button
                    onClick={() => {
                      setEditMode(false);
                      setEditingQuestion(null);
                      setCurrentQuestion('');
                    }}
                    className="border-2 border-blue-100 bg-white hover:opacity-90 text-blue-800 rounded-xl px-4 py-2 justify-end"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveQuestion}
                    className="bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90 text-white rounded-xl px-4 py-2 justify-end"
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-end gap-2">
                <Button
                  className="flex justify-between items-center bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] hover:opacity-90 text-white rounded-xl p-4 w-48 h-11 font-medium cursor-pointer"
                  onClick={() => handleAddNewQuestion()}
                >
                  <img
                    src="/icons/plus_icon_white.svg"
                    alt="plus_icon_white"
                    className="w-4 h-4"
                  />
                  Add new questions
                </Button>
                <Button className="flex justify-between items-center border-2 border-blue-100 bg-white hover:opacity-90 text-blue-800 rounded-xl p-4 w-23 h-11 font-medium cursor-pointer">
                  Next
                  <img
                    src="/icons/right_arrow_blue.svg"
                    alt="right_arrow_blue"
                    className="w-5 h-3"
                  />
                </Button>
              </div>
            )}
          </div>

          {/* MCQ Popup */}
          {showMCQPopup && (
            <MCQPopup
              question={currentQuestion}
              options={mcqOptions}
              onQuestionChange={setCurrentQuestion}
              onOptionChange={handleOptionChange}
              onCorrectOptionChange={handleCorrectOptionChange}
              onSave={handleSaveQuestion}
              onClose={() => {
                setShowMCQPopup(false);
                setEditMode(false);
                setEditingQuestion(null);
                setCurrentQuestion('');
                setMcqOptions(MCQOptionsInitialValue);
              }}
            />
          )}
        </div>
      </>
    );
  }
);
