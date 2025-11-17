import React from 'react';
import { cn } from '@heroui/react';

interface MCQOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface MCQPopupProps {
  question: string;
  options: MCQOption[];
  onQuestionChange: (question: string) => void;
  onOptionChange: (optionId: number, text: string) => void;
  onCorrectOptionChange: (optionId: number) => void;
  onSave: () => void;
  onClose: () => void;
}

export const MCQPopup: React.FC<MCQPopupProps> = ({
  question,
  options,
  onQuestionChange,
  onOptionChange,
  onCorrectOptionChange,
  onSave,
  onClose,
}) => {
  return (
    <div className="absolute inset-0 bg-gray-500/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-m font-semibold">Add/Edit MCQ Question</h2>
          <button
            onClick={onClose}
            aria-label="Close Popup"
            className="px-2 hover:bg-gray-50 rounded-full w-8 h-8 justify-center cursor-pointer"
          >
            <img
              src="/icons/close_icon_blue.svg"
              alt="close_icon_blue"
              className="w-3 h-3"
            />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              className={cn(
                'w-full px-3 py-2',
                'border rounded-xl placeholder-gray-400',
                'min-h-[60px] resize-y'
              )}
              placeholder="Enter your question"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => onCorrectOptionChange(option.id)}
                  className="h-4 w-4 text-blue-600"
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => onOptionChange(option.id, e.target.value)}
                  placeholder={`Option ${option.id}`}
                  className={cn(
                    'flex-1 px-3 py-2',
                    'border rounded-xl placeholder-gray-400',
                    'text-sm'
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] text-white rounded-xl hover:opacity-90 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
