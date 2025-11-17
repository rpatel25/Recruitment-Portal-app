import React from "react";
import { cn } from "@heroui/theme";

interface IProps {
  setShowMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeetingSummaryHeader = ({ setShowMeetingSummary }: IProps) => {
  return (
    <div
      className={cn(
        "p-3.5",
        "flex flex-col items-start gap-2.5 self-stretch",
        "rounded-t-2xl border border-[#C0C0C0] bg-white"
      )}
    >
      <div className="flex items-center gap-6">
        <img
          src="./icons/left_arrow.svg"
          alt="left_arrow"
          className="w-6 h-6"
          onClick={() => setShowMeetingSummary(false)}
        />

        <h3 className="text-black text-center text-base font-semibold">
          Meeting Conversations
        </h3>
      </div>
    </div>
  );
};
