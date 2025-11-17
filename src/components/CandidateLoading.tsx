import React, { useState, useEffect, useRef } from "react";
import { classNames } from "@/util/classNames";
import { cn } from "@heroui/theme";
import { candidateLoadingSteps } from "@/util/data";

const CandidateLoadingScreen = ({
  loadingMessages,
}: {
  loadingMessages: string[];
}) => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 500);

    // Ensure video plays automatically and at 50% speed
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set playback rate to 50%
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("loading messages", loadingMessages);
  }, [loadingMessages]);

  return (
    <div
      className={cn(
        classNames.flexCenter,
        "fixed inset-0 bg-[#F5F6FA] bg-opacity-90 z-50 flex-col"
      )}
    >
      <div className={cn(classNames.flexCenter, "flex-col")}>
        <div className="flex items-center gap-1 mb-6">
          {candidateLoadingSteps.map((step, index) => (
            <div key={index} className={`relative transform skew-x-[-20deg]`}>
              <div
                className={cn(
                  "min-w-[100px] px-6 py-2 mr-3",
                  "text-white text-lg font-semibold text-center",
                  "bg-[#9AA7FF] shadow-lg z-10",
                  index === 0 ? "rounded-l-full" : "",
                  index === candidateLoadingSteps.length - 1
                    ? "rounded-r-full"
                    : ""
                )}
              >
                <span className="inline-block transform skew-x-[20deg]">
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p
          className={cn(
            "flex items-center gap-1",
            "bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text",
            "text-center text-2xl font-medium"
          )}
        >
          {loadingMessages && loadingMessages.length > 0
            ? loadingMessages[index]
            : "Updating Candidate details"}
          <span>...</span>
        </p>
      </div>
    </div>
  );
};

export default CandidateLoadingScreen;
