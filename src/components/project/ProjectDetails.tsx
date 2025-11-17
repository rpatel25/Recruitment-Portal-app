import { useGetProjectDetailsbyIdQuery } from "@/store/services/ApiRequest";
import { getDateDifference } from "@/util/handleDateTime";
import { cn } from "@heroui/theme";
import React, { useState } from "react";
import TalentBase from "./TalentBase";

interface IProps {
  currentProjectId: string;
}

const projectTabs = ["Talent Base", "Pipeline"];

export const ProjectDetails = ({ currentProjectId }: IProps) => {
  const { data, isLoading, isError } =
    useGetProjectDetailsbyIdQuery(currentProjectId);
  const project = data?.data;
  const [selectedTab, setSelectedTab] = useState(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !project) {
    return <div>No Details Found!</div>;
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <img src="/icons/job_card.svg" alt="job_card" />
        <h3 className="text-[#323130] text-xl font-medium tracking-[-0.5px]">
          {project.name}
        </h3>
        <div className="w-2 h-2 rounded-[50%] bg-[#706F6E]" />
        <h3 className="text-[#323130] text-xl font-medium tracking-[-0.5px]">
          {project.job_title}
        </h3>
        <div className="w-2 h-2 rounded-[50%] bg-[#706F6E]" />
        <h3 className="text-[#323130] text-xl font-medium tracking-[-0.5px]">
          {project.company_hiring_for}
        </h3>
        <div className="bg-[#EBEDF9] rounded flex items-center gap-1">
          <img src="/icons/timer.svg" alt="timer" />
          <h5 className="text-[#323130] text-sm font-medium">
            Created - {getDateDifference(project.created_at)} days ago
          </h5>
        </div>
      </div>

      <div
        className={cn(
          "w-full h-8",
          "flex items-start gap-6",
          "border-b border-gray-200"
        )}
      >
        {projectTabs.map((menu, index) => {
          const isDisabled = index === 2 || index === 3;
          return (
            <div
              key={index}
              className={`flex px-2 pb-2 flex-col justify-center items-center gap-2 cursor-pointer relative
                    ${
                      selectedTab === index
                        ? "border-b-[3px] border-b-[#3B4CBF]"
                        : ""
                    }
                    ${
                      isDisabled
                        ? "pointer-events-none text-gray-400"
                        : "text-black"
                    }`}
              onClick={() => !isDisabled && setSelectedTab(index)}
            >
              <span
                className={cn(
                  "h-6",
                  "flex justify-center items-center gap-2",
                  selectedTab === index ? "text-[#3B4CBF]" : "text-[#323130]",
                  "text-center text-sm font-medium"
                )}
              >
                {menu}
              </span>
            </div>
          );
        })}
      </div>
      {selectedTab === 0 && (
        <TalentBase projectId={currentProjectId} talentBaseFlag={true} />
      )}
      {selectedTab === 1 && (
        <TalentBase projectId={currentProjectId} talentBaseFlag={false} />
      )}
    </>
  );
};
