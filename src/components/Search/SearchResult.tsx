import { Candidate } from "@/types/Candidate";
import { calculateExperience } from "@/util/utils";
import { useMemo, useState } from "react";
import { Button, cn } from "@heroui/react";
import { capitalizeWords } from "@/util/handleTexts";
import { SocialMedia } from "./CandidateProfile/SocialMedia";
import { Skills } from "./CandidateProfile/Skills";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import UserAvatar from "./UseAvatar";

interface IProps {
  candidate: Candidate;
  handleShowFullProfile: (candidate: Candidate) => void;
  setSelectedCandidates: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCandidates: string[];
  setShowSaveDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchResult({
  candidate,
  handleShowFullProfile,
  setSelectedCandidates,
  selectedCandidates,
  setShowSaveDialog,
}: IProps) {
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showEmailCopy, setShowEmailCopy] = useState(false);
  const [showPhoneCopy, setShowPhoneCopy] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const candidateSummary = candidate.summary ?? "No summary available";
  const words = candidateSummary.split(" ");
  const shouldTruncate = words.length > 30;

  const displaySummary = expanded
    ? candidateSummary
    : words.slice(0, 30).join(" ") + (shouldTruncate ? "..." : "");

  const topCandidate = [1, 2, 3].includes(candidate.rank);

  const checked = selectedCandidates.includes(candidate.candidate_id)
    ? true
    : false;

  candidate.totalExperienceDisplay = useMemo(
    () => calculateExperience(candidate.totalExperience),
    [candidate.totalExperience]
  );

  const handleFullProfileClick = () => {
    handleShowFullProfile(candidate);
  };

  const onSelectCandidate = () => {
    if (selectedCandidates.includes(candidate.candidate_id)) {
      setSelectedCandidates((prev) =>
        prev.filter((i) => i !== candidate.candidate_id)
      );
    } else setSelectedCandidates((prev) => [...prev, candidate.candidate_id]);
  };

  const handleSaveCandidateToPipeline = () => {
    setSelectedCandidates([candidate.candidate_id]);
    setShowSaveDialog(true);
  };

  if (candidate.fullName === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <CustomCheckbox
            onChangeCheckbox={onSelectCandidate}
            checked={checked}
          />
          <UserAvatar
            user={{
              firstName: candidate.fullName.split(" ")[0],
              lastName:
                candidate.fullName.split(" ")[
                  candidate.fullName.split(" ").length - 1
                ],
              profilePhoto: candidate.profilePicture,
            }}
          />

          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-[#171717] text-xl font-medium">
                {capitalizeWords(candidate.fullName)}
              </h3>

              <p className="text-[#706F6E] text-base leading-2.5">•</p>

              <h4 className="text-[#706F6E] text-base">
                {capitalizeWords(candidate.jobTitle)}
              </h4>

              {topCandidate && (
                <p className="text-[#706F6E] text-base leading-2.5">•</p>
              )}

              {topCandidate && (
                <div
                  className={cn(
                    "bg-[linear-gradient(53deg,#FF8C3F_27.79%,#864CEF_79.83%)] rounded-full",
                    "flex items-center gap-3 py-1 px-3",
                    "text-white text-sm font-medium"
                  )}
                >
                  <img src="icons/search_rank.svg" alt="Rank Icon" />
                  Top Candidate
                </div>
              )}
            </div>

            <div className="flex items-center">
              <img src="/icons/company_icon.svg" alt="" className="mr-1" />
              <h6 className="text-[#AEAEB2] text-sm mr-2">
                {candidate.company ? capitalizeWords(candidate.company) : "NA"}{" "}
                - {candidate.totalExperience ?? "NA"} Years
              </h6>

              <img
                src="/icons/location_icon_gray.svg"
                alt=""
                className="mr-1"
              />
              <h6 className="text-[#AEAEB2] text-sm">
                {capitalizeWords(candidate.location ?? "NA")}
              </h6>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {candidate.email && candidate.email !== "Not Available" ? (
            <div className="relative">
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                className={cn(
                  "bg-[linear-gradient(53deg,#483FC5_27.79%,#864CEF_79.83%)] rounded-lg",
                  "py-1.5 px-3"
                )}
                onMouseEnter={() => setShowEmailTooltip(true)}
                onMouseLeave={() => {
                  setShowEmailTooltip(false);
                  setShowEmailCopy(false);
                }}
                onPress={() => {
                  if (candidate.email) {
                    navigator.clipboard.writeText(candidate.email);
                    setShowEmailCopy(true);
                  }
                }}
              >
                <img src="./icons/mail_white.svg" className="w-5 h-5" />
              </Button>

              {showEmailTooltip && (
                <div className="absolute top-full right-0 mt-1 w-[225px] h-[52px] bg-white border border-[#C0C0C0] rounded-lg shadow-md z-10">
                  <div className="flex items-center gap-2 px-1 py-3">
                    {showEmailCopy ? (
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.1483 6.04281L7.14828 15.0428C7.09604 15.0951 7.034 15.1366 6.96572 15.1649C6.89743 15.1932 6.82423 15.2078 6.75031 15.2078C6.67639 15.2078 6.60319 15.1932 6.53491 15.1649C6.46662 15.1366 6.40458 15.0951 6.35234 15.0428L2.41484 11.1053C2.3093 10.9998 2.25 10.8566 2.25 10.7073C2.25 10.5581 2.3093 10.4149 2.41484 10.3094C2.52039 10.2038 2.66355 10.1445 2.81281 10.1445C2.96208 10.1445 3.10523 10.2038 3.21078 10.3094L6.75031 13.8496L15.3523 5.24687C15.4579 5.14133 15.601 5.08203 15.7503 5.08203C15.8996 5.08203 16.0427 5.14133 16.1483 5.24687C16.2538 5.35242 16.3131 5.49558 16.3131 5.64484C16.3131 5.79411 16.2538 5.93727 16.1483 6.04281Z"
                          fill="#34C759"
                        />
                      </svg>
                    ) : (
                      <span className=""></span>
                    )}
                    <span className="text-[#323130] text-sm font-normal leading-5">
                      {showEmailCopy
                        ? "Email copied to clipboard"
                        : candidate.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {candidate.mobileNumber &&
          candidate.mobileNumber !== "Not Available" ? (
            <div className="relative">
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                className={cn(
                  "bg-[linear-gradient(53deg,#483FC5_27.79%,#864CEF_79.83%)] rounded-lg",
                  "py-1.5 px-3",
                  candidate.mobileNumber === "Not Available"
                    ? "cursor-not-allowed"
                    : ""
                )}
                onMouseEnter={() => setShowPhoneTooltip(true)}
                onMouseLeave={() => {
                  setShowPhoneTooltip(false);
                  setShowPhoneCopy(false);
                }}
                onPress={() => {
                  if (candidate.mobileNumber) {
                    navigator.clipboard.writeText(candidate.mobileNumber);
                    setShowPhoneCopy(true);
                  }
                }}
              >
                <img src="./icons/phone_white.svg" className="w-5 h-5" />
              </Button>

              {showPhoneTooltip && (
                <div className="absolute top-full right-0 mt-1 w-[225px] h-[52px] bg-white border border-[#C0C0C0] rounded-lg shadow-md z-10">
                  <div className="flex items-center gap-2 px-4 py-3">
                    {showPhoneCopy ? (
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.1483 6.04281L7.14828 15.0428C7.09604 15.0951 7.034 15.1366 6.96572 15.1649C6.89743 15.1932 6.82423 15.2078 6.75031 15.2078C6.67639 15.2078 6.60319 15.1932 6.53491 15.1649C6.46662 15.1366 6.40458 15.0951 6.35234 15.0428L2.41484 11.1053C2.3093 10.9998 2.25 10.8566 2.25 10.7073C2.25 10.5581 2.3093 10.4149 2.41484 10.3094C2.52039 10.2038 2.66355 10.1445 2.81281 10.1445C2.96208 10.1445 3.10523 10.2038 3.21078 10.3094L6.75031 13.8496L15.3523 5.24687C15.4579 5.14133 15.601 5.08203 15.7503 5.08203C15.8996 5.08203 16.0427 5.14133 16.1483 5.24687C16.2538 5.35242 16.3131 5.49558 16.3131 5.64484C16.3131 5.79411 16.2538 5.93727 16.1483 6.04281Z"
                          fill="#34C759"
                        />
                      </svg>
                    ) : (
                      <span className=""></span>
                    )}
                    <span className="text-[#323130] text-sm font-normal leading-5">
                      {showPhoneCopy
                        ? "Mobile phone copied to clipboard"
                        : candidate.mobileNumber}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <SocialMedia candidate={candidate} />
        <Skills skills={candidate.skills} />
      </div>

      <h4 className="text-black text-base mb-3">
        {displaySummary}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="ml-2 text-blue-500 underline cursor-pointer"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}
      </h4>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="solid"
          color="primary"
          startContent={<img src="icons/plus_icon.svg" className="h-5 w-5" />}
          className={cn(
            "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]",
            "py-1.5 px-3 rounded-lg",
            "text-white text-center text-sm font-semibold"
          )}
          onPress={handleSaveCandidateToPipeline}
        >
          Save to pipeline
        </Button>

        <Button
          variant="bordered"
          endContent={<img src="icons/full_profile.svg" className="h-5 w-5" />}
          className={cn(
            "bg-white border border-solid border-[#C8D2FF] rounded-xl",
            "text-[#3B4CBF] text-center text-base font-medium"
          )}
          onPress={handleFullProfileClick}
        >
          See Full Profile
        </Button>
      </div>
    </>
  );
}
