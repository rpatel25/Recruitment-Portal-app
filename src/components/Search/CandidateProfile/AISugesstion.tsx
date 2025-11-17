import { Candidate } from "@/types/Candidate";
import { cn } from "@heroui/theme";
import React from "react";

interface IProps {
  candidate: Candidate;
}

export const AISugesstion = ({ candidate }: IProps) => {
  console.log("candidate info", candidate);

  return (
    <div
      className={cn(
        "w-full p-4 mb-4",
        "border border-solid border-[#C8D2FF] rounded-xl"
      )}
    >
      <h3
        className={cn(
          "bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)]",
          "bg-clip-text text-transparent",
          "text-xl font-medium mb-4"
        )}
      >
        Meets 4/4 required and 3/4 nice to have qualifications
      </h3>

      <div className="h-[1px] w-full bg-[#C8D2FF] mb-4" />

      <div className="flex items-center mb-2">
        <img src="/icons/ai_points_icon.svg" alt="" className="mr-1.5" />

        <h5 className="text-[#171717] text-base">
          Proficiency with Figma, Sketch, and Adobe XD • Strong portfolio
          showcasing responsive web and mobile design • Experience in user
          research • Usability testing • Prototyping workflows
        </h5>
      </div>

      <div className="flex items-center">
        <img src="/icons/question_points_icon.svg" alt="" className="mr-1.5" />
        <h5 className="text-[#171717] text-base">
          Missing advanced motion design/micro-interaction experience
        </h5>
      </div>
    </div>
  );
};
