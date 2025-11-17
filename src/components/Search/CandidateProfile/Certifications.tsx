import { Candidate } from "@/types/Candidate";
import { cn } from "@heroui/theme";
import React from "react";

interface IProps {
  candidate: Candidate;
}

export const Certifications = ({ candidate }: IProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 mb-4",
        "border border-solid border-[#C8D2FF] rounded-xl"
      )}
    >
      <h3 className="text-[#171717] text-xl font-medium mb-4">
        Certificates & Awards
      </h3>

      <div className="h-[1px] w-full bg-[#C8D2FF] mb-4" />

      {candidate.certifications ? (
        <div className="flex items-center gap-1 mb-3">
          <img className="w-6 h-6" src="./icons/full_profile_diploma.svg" />

          <p className="text-[#323130] text-sm font-medium">
            {candidate.certifications}
          </p>
        </div>
      ) : (
        <h4 className="text-[#171717] text-sm font-medium">
          Candidate don't have any education listed
        </h4>
      )}
    </div>
  );
};
