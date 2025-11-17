import React from "react";

const RecordingMarquee = ({ isRecording }: { isRecording: boolean }) => {
  return (
    <div className="overflow-hidden w-full h-6 relative">
      <div className={`absolute top-0 ${isRecording ? "animate-marquee" : ""}`}>
        <h3 className="text-[#323130] text-sm font-medium">
          Listening
          {isRecording && (
            <span className="inline-block">
              <span className="animate-typing-dots">.</span>
            </span>
          )}
        </h3>
      </div>
      <style jsx>{`
        @keyframes typing-dots {
          0%, 20% { content: "."; }
          40% { content: ".."; }
          60% { content: "..."; }
          80%, 100% { content: "."; }
        }
        .animate-typing-dots::after {
          content: "";
          animation: typing-dots 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default RecordingMarquee;
