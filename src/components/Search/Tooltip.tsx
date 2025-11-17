import { Score } from "@/util/Types";
import React, { useState } from "react";

interface TooltipProps {
  score: Score;
  children: React.ReactNode;
}

export const Tooltip = ({ score, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="tooltip flex flex-col px-6 py-8 w-[473px] h-[256px] rounded-2xl border border-[#DDDFE3] shadow-lg shadow-black/8">
          <div className="flex justify-between h-[36px] mb-6 items-center px-2">
            <p className="text-[#323130] font-normal text-md">Overall Score</p>
            <div
              className=" flex gap-2 px-2 py-4 h-[20px] w-fit rounded-sm items-center"
              style={{
                background:
                  "var(--Rank-Gradient, linear-gradient(90deg, #6371D0 0%, #3B88BF 100%))",
              }}
            >
              <img
                src="icons/search_rank.svg"
                className="w-4 h-4"
                alt="Rank Icon"
              />
              <p className="text-xs text-[#FFF]">Rank</p>
              <p className="text-xs text-[#FFF]">{score["rank"]}</p>
            </div>
          </div>
          <div className="scores-bar flex flex-col">
            <div className="flex gap-2 w-[425px] h-[20px] justify-between px-2 items-center mb-2">
              <div className="text-sm font-medium dark:text-[#444A6D] ">
                Experience{" "}
              </div>
              <div className="bg-gray-200 rounded-full w-[180px] h-1 mt-1 mb-1 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                  style={{ width: `${score["experience_score"]}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-2 w-[425px] h-[20px] justify-between px-2 items-center mb-2">
              <div className="text-sm font-medium dark:text-[#444A6D] ">
                {" "}
                Skills{" "}
              </div>
              <div className="bg-gray-200 rounded-full w-[180px] h-1 mt-1 mb-1 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                  style={{ width: `${score["skill_score"]}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-2 w-[425px] h-[20px] justify-between px-2 items-center mb-2">
              <div className="text-sm font-medium dark:text-[#444A6D] bg-gradient-to-r">
                {" "}
                Projects{" "}
              </div>
              <div className="bg-gray-200 rounded-full w-[180px] h-1 mt-1 mb-1 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500 from-[#263BC7] via-[#864CEF] to-[#005B97]"
                  style={{ width: `${score["project_score"]}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-2 w-[425px] h-[20px] justify-between px-2 items-center mb-2">
              <div className="text-sm font-medium dark:text-[#444A6D] ">
                {" "}
                Platform{" "}
              </div>
              <div className="bg-gray-200 rounded-full w-[180px] h-1 mt-1 mb-1 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                  style={{ width: `${score["platform_score"]}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2 w-[425px] h-[20px] justify-between px-2 items-center mb-2">
              <div className="text-sm font-medium dark:text-[#444A6D] ">
                {" "}
                Industry Index{" "}
              </div>

              <div className="bg-gray-200 rounded-full w-[180px] h-1 mt-1 mb-1 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                  style={{
                    width: `${
                      score["industry_index_score"]
                        ? score["industry_index_score"]
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
