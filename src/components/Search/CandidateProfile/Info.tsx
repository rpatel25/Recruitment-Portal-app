import { download_single_candidate_result } from "@/services/Candidate";
import { Candidate } from "@/types/Candidate";
import { capitalizeWords } from "@/util/handleTexts";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import React, { useState } from "react";
import { SocialMedia } from "./SocialMedia";
import { Tooltip } from "../Tooltip";

interface IProps {
  candidate: Candidate;
  session_id: string;
}

export const Info = ({ candidate, session_id }: IProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // hide after 2s
  };

  return (
    <>
      <div
        className={cn(
          "w-full p-4 mb-4",
          "border border-solid border-[#C8D2FF] rounded-xl"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <img
              src={
                candidate.profilePicture
                  ? candidate.profilePicture
                  : "/icons/full_profile_avatar.png"
              }
              alt="profilePicture"
              className="w-[76px] h-[76px]"
            />

            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-[#171717] text-xl font-medium">
                  {capitalizeWords(candidate.fullName)}
                </h3>

                <Tooltip score={candidate.score}>
                  <div
                    className="w-fit h-5 py-4 px-2 rounded-full flex items-center gap-1.5"
                    style={{
                      background:
                        "linear-gradient(53deg, #FF8C3F 27.79%, #864CEF 79.83%)",
                    }}
                  >
                    <img
                      src="icons/search_rank.svg"
                      className="w-4 h-4"
                      alt="Rank Icon"
                    />
                    <p className="text-xs text-[#FFF]">
                      Rank {candidate.score["rank"]}
                    </p>
                  </div>
                </Tooltip>
              </div>

              <h4 className="text-[#706F6E] text-base">
                {capitalizeWords(candidate.jobTitle)}
              </h4>
              <div className="flex items-center">
                <img src="/icons/company_icon.svg" alt="" className="mr-1" />
                <h6 className="text-[#AEAEB2] text-sm mr-2">
                  {capitalizeWords(candidate.company ?? "")} -{" "}
                  {candidate.totalExperience} Years
                </h6>

                <img
                  src="/icons/location_icon_gray.svg"
                  alt=""
                  className="mr-1"
                />
                <h6 className="text-[#AEAEB2] text-sm">
                  {capitalizeWords(candidate.location ?? "")}
                </h6>
              </div>
            </div>
          </div>

          <Button
            variant="solid"
            color="primary"
            startContent={<img src="./icons/download_white.svg" />}
            className={cn(
              "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-lg",
              "py-1.5 px-3",
              "text-white text-center text-sm font-semibold"
            )}
            onPress={() => {
              download_single_candidate_result(
                session_id,
                candidate.candidate_id ?? ""
              );
            }}
          >
            Download full profile
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <SocialMedia candidate={candidate} />

          <div>
            <h5 className="text-[#171717] text-sm font-medium mb-2">
              Contact Info
            </h5>

            <div className="flex items-center gap-1">
              {candidate.mobileNumber &&
              candidate.mobileNumber !== "Not Available" ? (
                <>
                  <img
                    src="/icons/contact_icon_blue.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  <Button
                    variant="light"
                    className="p-0 text-[#171717] text-sm"
                    onPress={() => handleCopy(candidate.mobileNumber ?? "")}
                  >
                    {candidate.mobileNumber}
                  </Button>
                </>
              ) : null}

              {candidate.email && candidate.email !== "Not Available" ? (
                <>
                  <img
                    src="/icons/mail_icon_blue.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  <Button
                    variant="light"
                    className="p-0 m-0 text-[#171717] text-sm"
                    onPress={() => handleCopy(candidate.email ?? "")}
                  >
                    {candidate.email}
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {copied && (
        <div
          className={cn(
            "absolute top-6 right-80 bg-gray-800 px-3 py-1",
            "text-white text-sm",
            "rounded shadow-md animate-fade-in"
          )}
        >
          Copied to Clipboard!
        </div>
      )}
    </>
  );
};
