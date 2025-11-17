import { Candidate } from "@/types/Candidate";
import { calculateExperience } from "@/util/utils";
import { Tooltip } from "@/components/Search/Tooltip";
import { useMemo, useState } from "react";
import { Button, cn } from "@heroui/react";
import { classNames } from "@/util/classNames";
import { formatDateInExperience } from "@/util/handleDateTime";
import UserAvatar from "@/components/Search/UseAvatar";

const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function TalentBaseResult({
  candidate,
  showFullProfile: onCandidateClick,
  saved,
  onSaveClick,
}: {
  candidate: Candidate;
  showFullProfile: (candidate: Candidate) => void;
  saved: boolean;
  onSaveClick: (candidate: Candidate, saved: boolean) => void;
}) {
  const summaryTrim = candidate.summary ?? "No summary available";
  const skillsArrNonEmpty = candidate.skills.filter((skill) => {
    if (skill.length != 0) return skill;
  });
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showEmailCopy, setShowEmailCopy] = useState(false);
  const [showPhoneCopy, setShowPhoneCopy] = useState(false);
  candidate.score = candidate.score || {};
  candidate.score["rank"] = candidate.rank ?? "Not calculated";
  candidate.profilePicture = candidate.profilePicture ?? "";
  candidate.totalExperienceDisplay = useMemo(
    () => calculateExperience(candidate.totalExperience),
    [candidate.totalExperience]
  );
  const socialMap = new Map<string, string>();

  for (const { network, url } of candidate.profiles) {
    if (!socialMap.has(network)) {
      socialMap.set(network, url);
    }
  }
  if (!socialMap.has("github") && candidate.githubURL) {
    socialMap.set("github", candidate.githubURL);
  }
  if (!socialMap.has("linkedin") && candidate.linkedinURL) {
    socialMap.set("linkedin", candidate.linkedinURL);
  }

  const handleFullProfileClick = () => {
    onCandidateClick(candidate);
  };

  if (candidate.fullName === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className={cn(classNames.flexBetween, "gap-3 mb-6")}>
        {/* <img
          src={
            candidate.profilePicture
              ? candidate.profilePicture
              : "icons/full_profile_avatar.png"
          }
          className="w-14 h-14 rounded-full"
        /> */}
        <UserAvatar
          user={{
            firstName: candidate.fullName,
            lastName: candidate.jobTitle,
            profilePhoto: candidate.profilePicture,
          }}
          size={56}
        />

        <div className="w-full">
          <div className={cn("flex items-baseline", "gap-1 mb-2")}>
            <h4 className="text-base font-semibold text-[#323130]">
              {capitalizeWords(candidate.fullName)}
            </h4>

            <p className="search-dot">•</p>

            <h4 className="text-[#706F6E] text-base font-semibold">
              {candidate.jobTitle}
            </h4>
          </div>
          <div className={cn("flex items-baseline", "gap-1")}>
            <div
              className={cn(
                "bg-[#EBEDF9]",
                "p-2",
                "text-[#323130] text-xs text-center",
                "rounded-full"
              )}
            >
              {candidate.companyDetails?.name}
            </div>

            <p className="search-dot">•</p>

            <p className="text-[#323130] text-sm font-medium">
              Experience {candidate.totalExperienceDisplay}
            </p>

            <p className="search-dot">•</p>

            {candidate.companyDetails && candidate.companyDetails.start_date ? (
              <p className="text-[#323130] text-sm font-medium">
                {formatDateInExperience(candidate.companyDetails.start_date)} -{" "}
                {formatDateInExperience(candidate.companyDetails.end_date)}
              </p>
            ) : null}

            {candidate.location ? <p className="search-dot">•</p> : null}
            {candidate.location ? (
              <p className="text-[#323130] text-sm font-medium">
                {candidate.location}
              </p>
            ) : null}
          </div>
        </div>

        <div className={cn(classNames.flexCenter, "gap-4")}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Button
                className={`flex h-9 w-[190px] px-4 justify-center items-center gap-2 rounded-lg shadow-[0px_0px_6px_0px_rgba(0,0,0,0.20)] text-sm font-medium leading-5 ${
                  saved ? "bg-white text-[#3B4CBF]" : "bg-[#3B4CBF] text-white"
                }`}
                onMouseEnter={() => setShowSaveTooltip(true)}
                onMouseLeave={() => setShowSaveTooltip(false)}
                onPress={() => onSaveClick(candidate, saved)}
              >
                {saved ? (
                  <>
                    <img
                      src="./icons/tick.svg"
                      alt="Tick"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="text-[#323130] text-center text-sm font-medium">
                      Saved to Pipeline
                    </p>
                  </>
                ) : (
                  <>
                    <img
                      src="./icons/save_white.svg"
                      alt="Tick"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="text-white text-center text-sm font-medium">
                      Save to Pipeline
                    </p>
                  </>
                )}
              </Button>
              {showSaveTooltip && (
                <div className="absolute top-full left-0 mt-1 bg-black p-2 text-sm rounded shadow-md z-10">
                  {saved ? (
                    <span className="text-white">Remove from Pipeline</span>
                  ) : (
                    <span className="text-white">Add to Pipeline</span>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                isIconOnly
                className="h-[24px] w-[24px]"
                onMouseEnter={() => setShowEmailTooltip(true)}
                onMouseLeave={() => {
                  setShowEmailTooltip(false);
                  setShowEmailCopy(false);
                }}
                onClick={() => {
                  if (candidate.email && candidate.email !== "Not Available") {
                    navigator.clipboard.writeText(candidate.email);
                    setShowEmailCopy(true);
                  }
                }}
              >
                <img className="h-8 w-8" src="./icons/mail.svg" />
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
            <div className="relative">
              <Button
                isIconOnly
                className="h-[24px] w-[24px]"
                onMouseEnter={() => setShowPhoneTooltip(true)}
                onMouseLeave={() => {
                  setShowPhoneTooltip(false);
                  setShowPhoneCopy(false);
                }}
                onClick={() => {
                  if (
                    candidate.mobileNumber &&
                    candidate.mobileNumber != "Not Available"
                  ) {
                    navigator.clipboard.writeText(candidate.mobileNumber);
                    setShowPhoneCopy(true);
                  }
                }}
              >
                <img className="h-8 w-8" src="./icons/phone.svg" />
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
            {/* <div className="relative">
              <Button isIconOnly className="h-[24px] w-[24px]">
                <img className="h-8 w-8" src="./icons/luca_menu.svg" />
              </Button>
            </div> */}
          </div>
          {/* <Button isIconOnly>
            <img src="icons/save.svg" alt="filter" className="h-8 w-8" />
          </Button>
          <Button isIconOnly>
            <img src="icons/mail.svg" alt="filter" className="h-8 w-8" />
          </Button>
          <Button isIconOnly>
            <img src="icons/phone.svg" alt="filter" className="h-8 w-8" />
          </Button>
          <Button isIconOnly>
            <img src="/icons/luca_menu.svg" alt="Menu" className="h-8 w-8" />
          </Button> */}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {candidate.rank.toString() == "Not calculated" && (
          <>
            <Tooltip score={candidate.score}>
              <h4 className="text-[#323130] text-base mb-2">Rank</h4>
              <div
                className={cn(
                  "bg-[linear-gradient(90deg,#6371D0_0%,#3B88BF_100%)] rounded-lg",
                  "flex items-center gap-3 px-2",
                  "text-white text-lg font-semibold"
                )}
              >
                <img src="icons/search_rank.svg" alt="Rank Icon" />
                {candidate.rank}
              </div>
            </Tooltip>
            <div className="w-[0.5px] h-14 bg-[#DDDFE3]"></div>
          </>
        )}

        <div>
          <h4 className="text-[#323130] text-base mb-3">Portfolio</h4>
          <div className="flex items-center gap-2">
            {/* <a href={candidate.linkedinURL} target="_blank">
              <img src="icons/linkedin_icon.svg" className="w-5 h-5" />
            </a>
            {candidate.githubURL && (
              <a href={candidate.githubURL} target="_blank">
                <img src="icons/github_icon.svg" className="w-5 h-5" />
              </a>
            )} */}
            {Array.from(socialMap.entries()).map(([network, url]) => (
              <a href={"https://" + url} target="_blank" key={network}>
                <div className="relative group">
                  <img
                    src={`icons/platform/${network}_icon.svg`}
                    className="w-5 h-5"
                  />
                  <div className="absolute hidden group-hover:block top-full  mt-1 w-fit h-[52px] bg-white border border-[#C0C0C0] rounded-lg shadow-md z-10">
                    <div className="flex items-center gap-2 px-4 py-3">
                      <span className="text-[#323130] text-sm font-normal leading-5">
                        {capitalizeWords(network)}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="w-[0.5px] h-14 bg-[#DDDFE3]"></div>

        <div>
          <h4 className="text-[#323130] text-base">Skills</h4>

          <div className="flex items-center gap-2">
            {skillsArrNonEmpty.slice(0, 4).map((skill) => (
              <Button
                radius="full"
                size="sm"
                className={cn("bg-[#DAEDF3] px-3", "text-xs text-[#323130]")}
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mb-4">
        <h4 className="text-[#323130] text-sm">{summaryTrim} </h4>
      </div>

      <Button
        variant="light"
        color="primary"
        endContent={<img src="icons/full_profile.svg" className="h-5 w-5" />}
        className={cn(
          "p-0",
          "text-[#3B4CBF] text-center text-base font-semibold"
        )}
        onPress={handleFullProfileClick}
      >
        See Full Profile
      </Button>
    </div>
  );
}
