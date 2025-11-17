import React from "react";
import { cn } from "@heroui/theme";
import { classNames } from "@/util/classNames";
import { Button } from "@heroui/react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecoreder";

interface IVoiceRecorderProps {
  chatType: number;
  file: File[] | null;
  inputValue: string;
  onUserInput: (input: string, file: File[], type: number) => void;
  recording: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File[] | null>>;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
  setRecording: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscriptLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoiceRecorder({
  chatType,
  file,
  inputValue,
  onUserInput,
  recording,
  setFile,
  setFileNames,
  setInputValue,
  setRecording,
  setTranscriptLoading,
}: IVoiceRecorderProps) {
  const {
    setIsMicActive,
    cancelRecording,
    stopRecording,
    isMicActive,
    handleButtonClick,
    startRecording,
  } = useVoiceRecorder(
    chatType,
    file,
    inputValue,
    onUserInput,
    recording,
    setInputValue,
    setFile,
    setFileNames,
    setRecording,
    setTranscriptLoading
  );

  if (isMicActive) {
    return (
      <div className="flex items-center gap-2 ml-2">
        <Button
          isIconOnly
          className={cn(
            "w-7 h-7 shrink-0",
            "rounded-full border border-solid border-[#706F6E]"
          )}
          onPress={() => {
            setIsMicActive(false);
            cancelRecording();
          }}
        >
          <img src="/icons/mic_close.svg" alt="mic_close" className="w-4 h-4" />
        </Button>

        <Button
          isIconOnly
          className={cn(
            "w-7 h-7 shrink-0",
            "rounded-full border border-solid border-[#706F6E]"
          )}
          onPress={() => {
            stopRecording();
            setIsMicActive(false);
          }}
        >
          <img src="/icons/mic_tick.svg" alt="mic_tick" className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
        <Button
          isIconOnly
          className={cn(
            "w-8 h-8 shrink-0 p-2 rounded-full",
            "bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)]"
          )}
          onPress={() => {
            startRecording();
            setIsMicActive(true);
          }}
        >
          <img src="/icons/luca_mic_new.svg" alt="mic" className="w-4 h-4" />
        </Button>
        <>
        {inputValue.length > 0 ? (
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
        ) : (
          <button
              className={cn(
                classNames.flexCenter,
                "w-8 h-8 p-[3.351px_3.066px_4.806px_5.091px] rounded-full",
                "2xl:w-8 2xl:h-8",
                "bg-gray-300"
              )}
            >
              <img
                src="/icons/luca_send.svg"
                alt="Send"
                className="w-[17px] h-[17px]"
              />
          </button>
        )}
        </>
    </div>
  );
}
