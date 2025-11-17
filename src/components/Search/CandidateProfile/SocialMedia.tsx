import { Candidate } from "@/types/Candidate";
import React from "react";

interface IProps {
  candidate: Candidate;
}

export const SocialMedia = ({ candidate }: IProps) => {
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

  return (
    <div>
      <h5 className="text-[#171717] text-sm font-medium mb-3.5">
        Portfolio Links
      </h5>
      <div className="flex items-center gap-2 w-full">
        {Array.from(socialMap.entries()).map(([key, value]) => (
          <a
            key={key}
            className="w-6 h-6"
            href={"https://" + value}
            target="_blank"
          >
            <img src={`icons/platform/${key}_icon.svg`} />
          </a>
        ))}
      </div>
    </div>
  );
};
