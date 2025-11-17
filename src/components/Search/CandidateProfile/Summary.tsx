import React from "react";
import { cn } from "@heroui/theme";
import { Candidate } from "@/types/Candidate";
import { Skills } from "./Skills";

interface IProps {
  candidate: Candidate;
}

export const Summary = ({ candidate }: IProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 mb-4",
        "border border-solid border-[#C8D2FF] rounded-xl"
      )}
    >
      <h3 className="text-[#171717] text-xl font-medium mb-4">Summary</h3>

      <div className="h-[1px] w-full bg-[#C8D2FF] mb-4" />

      <h4 className="text-[#171717] text-base mb-3">{candidate.summary}</h4>

      <Skills skills={candidate.skills} />
    </div>
  );
};
