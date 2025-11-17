import React from "react";
import { Candidate } from "@/types/Candidate";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
import { Education } from "./Education";
import { Certifications } from "./Certifications";
import { Info } from "./Info";
// import { AISugesstion } from "./AISugesstion";

interface IProps {
  candidate: Candidate;
  onClose: () => void;
  session_id: string;
}

export const CandidateProfile = ({
  candidate,
  onClose,
  session_id,
}: IProps) => {
  return (
    <div>
      <div
        className={cn(
          "w-full p-3.5 mb-4",
          "border border-solid border-[#C8D2FF] rounded-xl"
        )}
      >
        <Button
          variant="solid"
          color="primary"
          startContent={<img src="./icons/back_arrow_white.svg" />}
          className={cn(
            "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-lg",
            "py-1.5 px-3",
            "text-white text-center text-sm font-semibold"
          )}
          onPress={onClose}
        >
          Go to search results
        </Button>
      </div>

      <Info candidate={candidate} session_id={session_id} />

      {/* <AISugesstion candidate={candidate} /> */}

      <Summary candidate={candidate} />

      <WorkExperience candidate={candidate} />

      <div className="flex items-start justify-between gap-4">
        <Education candidate={candidate} />
        <Certifications candidate={candidate} />
      </div>
    </div>
  );
};
