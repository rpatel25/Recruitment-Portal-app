/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Candidate } from "@/types/Candidate";
import { cn } from "@heroui/theme";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IProps {
  candidate: Candidate;
}

export const WorkExperience = ({ candidate }: IProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 mb-4",
        "border border-solid border-[#C8D2FF] rounded-xl"
      )}
    >
      <h3 className="text-[#171717] text-xl font-medium mb-4">Experience</h3>

      <div className="h-[1px] w-full bg-[#C8D2FF] mb-4" />

      <div>
        {candidate.workSummary ? (
          <div className="text-[#323130] text-sm leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-[#171717] text-lg font-semibold"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-[#171717] text-sm font-medium"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="ml-4 list-disc " {...props} />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="border-t border-gray-200 my-3" {...props} />
                ),
                em: ({ node, ...props }) => <span {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5" {...props} />
                ),
              }}
            >
              {candidate.workSummary.replace(/\n/g, "\n\n")}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-[#323130] text-base">
            Candidate don't have any work experience
          </p>
        )}
      </div>
    </div>
  );
};
