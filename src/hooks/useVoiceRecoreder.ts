import { get_speech_to_text } from "@/services/Chatbot";
import { getStaticsMetric } from "@/util/utils";
import { useRef, useState } from "react";

export const useVoiceRecorder = (
  chatType: number,
  file: File[] | null,
  inputValue: string,
  onUserInput: (input: string, file: File[], type: number) => void,
  recording: boolean,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setFile: React.Dispatch<React.SetStateAction<File[] | null>>,
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>,
  setRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setTranscriptLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "recording" | "uploading">(
    "idle"
  );
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    console.log("startRecording");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
        audioBitsPerSecond: 128000,
      });

      recorder.ondataavailable = (e) => {
        console.log("Data available:", e.data.size);
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        if (status === "uploading") return;
        stream.getTracks().forEach((track) => track.stop());
      };

      audioChunksRef.current = [];
      recorder.start(1000); // Request data every second
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setStatus("recording");
    } catch (error) {
      console.error("Error starting recording:", error);
      setStatus("idle");
    }
  };

  const stopRecording = async () => {
    console.log("stopRecording");
    if (!mediaRecorderRef.current) {
      console.error("No media recorder available");
      setStatus("idle");
      setRecording(false);
      return;
    }

    try {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Wait a bit for the last data to be collected
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("Audio chunks collected:", audioChunksRef.current.length);
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      console.log("Audio blob size:", audioBlob.size);

      if (audioBlob.size === 0) {
        console.error("Created audio blob is empty");
        setStatus("idle");
        return;
      }

      setStatus("uploading");
      setTranscriptLoading(true);
      const result = await get_speech_to_text(audioBlob);
      setInputValue(result.data || "No transcript");
    } catch (error) {
      console.error("Error processing audio:", error);
      setInputValue("Error processing audio");
    } finally {
      setStatus("idle");
      setTranscriptLoading(false);
      audioChunksRef.current = []; // Clear the chunks after processing
    }
  };

  const cancelRecording = () => {
    console.log("cancelRecording");
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      audioChunksRef.current = []; // Clear data to prevent upload
      setInputValue("");
      setStatus("idle");
      setRecording(false);
    }
  };

  const handleRemoveAllFile = () => {
    setFileNames([]);
    setFile([]);
  };

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

  return {
    setIsMicActive,
    cancelRecording,
    stopRecording,
    isMicActive,
    handleButtonClick,
    startRecording,
  };
};
