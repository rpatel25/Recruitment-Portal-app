import React, { useState } from "react";
import { cn } from "@heroui/theme";
import RecordingMarquee from "@/components/chatbot/RecordingMarquee";
import { classNames } from "@/util/classNames";

interface ChatbotInputProps {
  analyzerType: string;
  onAnalyzerInput: (input:string,analyzer_type:string,session_id:string) => void;
  session_id: string;
}

const AnalyzerChatbotInput: React.FC<ChatbotInputProps> = ({
 analyzerType,
 onAnalyzerInput,
 session_id
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [transcriptLoading] = useState(false);
  const [recording] = useState(false);

  const handleButtonClick = () => {
    console.log(inputValue,analyzerType);
    onAnalyzerInput(inputValue,analyzerType,session_id);
    setInputValue(""); // Clear the input box
  };




  return (
    <div
      className={cn(
        "w-full p-4",
        "flex flex-col justify-center items-start gap-2",
        "rounded-lg border border-gray-200"
      )}
    >
      <div className="flex items-center w-full gap-2 mb-6">
        {transcriptLoading ? (
          <p className="text-[#323130] text-sm font-medium">
            Transcript Loading...
          </p>
        ) : recording ? (
          <RecordingMarquee isRecording={recording} />
        ) : (
          <textarea
            placeholder={analyzerType === "competitor_analysis" ? "Provide me the competitor name and location" : "Please provide me the job title and location"}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)} // Track input changes
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line when pressing Enter alone
                handleButtonClick(); // Call the send function
              }
            }}
            className={cn(
              "w-full h-5 2xl:h-16 flex-1",
              "text-[#323130] text-sm font-medium outline-none"
            )}
          />
        )}
        <div className="flex ml-auto gap-2 items-center">
          <button
            onClick={handleButtonClick} // Add click handler
            className={cn(
              classNames.flexCenter,
              "w-8 h-8 p-[3.351px_3.066px_4.806px_5.091px] rounded-full",
              "2xl:w-8 2xl:h-8",
              "bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)]"
            )}
          >
            <img
              src="/icons/luca_send.svg"
              alt="Send"
              className="w-[17px] h-[17px]"
            />
          </button>
        </div>
      </div>

      

    </div>
  );
};

export default AnalyzerChatbotInput;
