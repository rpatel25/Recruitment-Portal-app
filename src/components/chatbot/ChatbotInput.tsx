import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { getStaticsMetric } from "@/util/utils";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/react";
import { chatOptions, dropdownOptions } from "@/util/data";
import RecordingMarquee from "@/components/chatbot/RecordingMarquee";
import VoiceRecorder from "./VoiceRecorder";
import { CustomTooltip } from "@/assets/CustomTooltip";
import { classNames } from "@/util/classNames";
import { ChatMessage } from "@/types/chat.type";
import { getSourcingPromt } from "@/util/getSourcingPrompt";

interface ChatbotInputProps {
  onUserInput: (input: string, file: File[], type: number) => void; // Function type for the parent callback
  setChatType: (chatType: number) => void;
  chatType: number; // Add chatType prop
  setExpandChatbot: React.Dispatch<React.SetStateAction<boolean>>;
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  username: string | null;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  onUserInput,
  setChatType,
  chatType,
  setChat,
  username,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]); // State to hold the file name
  const [file, setFile] = useState<File[] | null>([]);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const handleButtonClick = (
    event?:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(event);
    if (inputValue.trim() || file) {
      onUserInput(inputValue, file || [], chatType); // Pass input value to parent component
      setInputValue(""); // Clear the input box
      handleRemoveAllFile();
    }
    try {
      getStaticsMetric(null);
    } catch (error) {
      console.error("Failed to get metrics", error);
    }
  };

  const handleAttachClick = () => {
    // if (chatType === 1 || chatType === -1) {
    //   return;
    // }
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles && newFiles.length > 0) {
      const newFileNames = Array.from(newFiles).map((file) => file.name);
      setFileNames((prevNames) => [...prevNames, ...newFileNames]); // Append new filenames
      setFile((prevFiles) => [...(prevFiles || []), ...Array.from(newFiles)]); // Append new files
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFileNames(fileNames.filter((name) => name !== fileName)); // Clear the file name

    setFile(file?.filter((file) => file.name !== fileName) || []);
  };

  const handleRemoveAllFile = () => {
    setFileNames([]);
    setFile([]);
  };

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
            placeholder="Ask me anything..."
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
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            className={cn(
              "w-7 h-7 shrink-0",
              "rounded-full border border-solid border-[#706F6E]"
            )}
            onPress={handleAttachClick}
          >
            <img
              src="/icons/luca_attach.svg"
              alt="luca_attach"
              className="w-4 h-4"
            />
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".pdf .docx .txt" // Restrict to PDF files
            multiple={true}
            onChange={handleFileChange} // Handle file selection
          />

          {chatOptions.map((option) => (
            <div key={option.key} className="relative group inline-block">
              <Button
                className={cn(
                  "w-fit h-7 px-2 py-1",
                  "text-xs font-medium",
                  "rounded-full border border-[#3B4CBF] cursor-pointer",
                  chatType === option.key ||
                    (chatType === 3 && option.key === 2) ||
                    (chatType === 4 && option.key === 2)
                    ? "bg-[#3B4CBF] text-white"
                    : "bg-white text-[#3B4CBF]"
                )}
                startContent={
                  <img
                    src={
                      chatType === option.key ||
                      (chatType === 3 && option.key === 2) ||
                      (chatType === 4 && option.key === 2)
                        ? `/icons/${option.selectedIcon}.svg`
                        : `/icons/${option.icon}.svg`
                    }
                    alt={option.icon}
                    className={cn("w-[15px] h-[15px]", "2xl:w-8")}
                  />
                }
                onPress={() => {
                  if (option.key === 2) {
                    // Toggle dropdown for chatType 2
                    setShowDropdown(!showDropdown);
                  } else {
                    if (chatType !== option.key) {
                      setChatType(option.key);
                      // setExpandChatbot(true);
                    } else {
                      setChatType(0);
                    }
                  }
                }}
              >
                {option.label}
              </Button>

              {/* Tooltip */}
              <div className="absolute z-50 -top-[56px] left-1/2 -translate-x-1/2 hidden group-hover:block">
                <div className="w-[125px] h-[46.106px] relative">
                  <CustomTooltip />
                  <div
                    className={cn(
                      classNames.flexCenter,
                      "absolute top-0 left-0 w-[125px] h-[46.106px] px-2  text-center"
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent"
                      )}
                    >
                      {option.tooltip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown for chatType 2 */}
              {option.key === 2 && showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute z-50 bottom-full left-0 mb-2"
                >
                  <div className="flex w-[165px] h-fit p-[8px_1px] flex-col justify-center items-start flex-shrink-0 rounded-xl border border-[#C0C0C0] bg-white shadow-[0px_10px_15px_0px_rgba(0,0,0,0.06)]">
                    {dropdownOptions.map((dropdownOption) => (
                      <div
                        key={dropdownOption.key}
                        className="flex p-[8px_11px] justify-between items-center self-stretch cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          if (chatType !== dropdownOption.key) {
                            if (dropdownOption.key === 2) {
                              setChat((prev) => [
                                ...prev,
                                {
                                  time: new Date().getTime().toString(),
                                  date: new Date(),
                                  message: getSourcingPromt(username || "user"),
                                  type: "luca",
                                },
                              ]);
                            }
                            setChatType(dropdownOption.key);
                          } else {
                            setChatType(0);
                          }
                          setShowDropdown(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={`/icons/${dropdownOption.icon}.svg`}
                            alt={dropdownOption.icon}
                            className="w-4 h-4"
                          />
                          <span className="text-[#323130] text-xs font-normal leading-4">
                            {dropdownOption.label}
                          </span>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                          {chatType === dropdownOption.key && (
                            <div className="w-2 h-2 rounded-full bg-[#3B4CBF]"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <VoiceRecorder
          chatType={chatType}
          file={file}
          inputValue={inputValue}
          onUserInput={onUserInput}
          recording={recording}
          setFile={setFile}
          setFileNames={setFileNames}
          setInputValue={setInputValue}
          setRecording={setRecording}
          setTranscriptLoading={setTranscriptLoading}
        />
      </div>

      {fileNames.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {fileNames.map((fileName) => (
            <div key={fileName} className="flex items-center gap-1">
              <span className="text-sm text-gray-600">{fileName}</span>
              <sup
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveFile(fileName)}
              >
                x
              </sup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatbotInput;
