import { useState } from "react";

interface ChatBotFilterExpandProps {
  title: string;
  options: string[]; // Adjust the type if options contain objects instead of strings
}

const ChatBotFilterExpand: React.FC<ChatBotFilterExpandProps> = ({
  title,
  options,
}) => {
  const [isExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(
    options.map(() => false)
  );

  const handleToggleAll = () => {
    const newState = !selectedOptions.every((checked) => checked);
    setSelectedOptions(options.map(() => newState));
  };

  const handleToggleOption = (index: number) => {
    const updated = [...selectedOptions];
    updated[index] = !updated[index];
    setSelectedOptions(updated);
  };

  return (
    <div
      className={`flex flex-col items-start border-b border-gray-200 w-full transition-all duration-300 ${
        isExpanded ? "py-0" : "h-[56px]"
      }`}
    >
      {/* Header */}
      <div className="flex h-[56px] px-4 items-center justify-between w-full border-b border-gray-200">
        <span
          style={{
            color: "#323130",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          {title}
        </span>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="flex flex-col px-4 w-full py-2 space-y-2 gap-4 items-center self-stretch">
          {/* First Row: Select All */}
          <div className="flex items-center gap-2 w-full">
            {!selectedOptions.every((checked) => checked) ? (
              <img
                src="icons/filter_checkbox.svg"
                onClick={handleToggleAll}
                className="cursor-pointer text-blue-500"
              />
            ) : (
              <img
                src="icons/filter_checkedbox.svg"
                onClick={handleToggleAll}
                className="cursor-pointer text-gray-500"
              />
            )}
            <span
              style={{
                color: "#000",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "16px",
              }}
              className="font-medium"
            >
              All
            </span>
          </div>
          {/* Options Rows */}
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 w-full">
              {!selectedOptions[index] ? (
                <img
                  src="icons/filter_checkbox.svg"
                  onClick={() => handleToggleOption(index)}
                  className="cursor-pointer text-blue-500"
                />
              ) : (
                <img
                  src="icons/filter_checkedbox.svg"
                  onClick={() => handleToggleOption(index)}
                  className="cursor-pointer text-gray-500"
                />
              )}
              <span
                style={{
                  color: "#000",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
                className="font-medium"
              >
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBotFilterExpand;
