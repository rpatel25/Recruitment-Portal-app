import { useGetProjectsQuery } from "@/store/services/ApiRequest";
import { Button, cn } from "@heroui/react";
import React from "react";
import { ProjectCard } from "./ProjectCard";

interface IProps {
  setIsCreationActive: (val: boolean) => void;
  setShowDetails: (val: boolean) => void;
  setCurrentProjectId: (val: string) => void;
}

export const ProjectsHome = ({
  setIsCreationActive,
  setShowDetails,
  setCurrentProjectId,
}: IProps) => {
  const { data } = useGetProjectsQuery();
  const projectsArray = data?.data;

  return (
    <div
      className={cn(
        "w-full h-[85vh] p-6",
        "bg-white shadow-md text-black",
        "rounded-2xl border border-gray-200"
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[#323130] text-[22px] font-medium leading-[normal]">
          All Projects ({projectsArray ? projectsArray.length : 0})
        </h3>

        <div className="flex items-center gap-3">
          <img
            src="/icons/search.svg"
            alt="search"
            className="cursor-pointer"
          />
          <img src="/icons/sort.svg" alt="sort" className="cursor-pointer" />
          <div className="bg-[#D9D9D9] w-[1px] h-7" />
          <Button
            color="primary"
            variant="solid"
            className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
            startContent={<img src="/icons/plus_icon.svg" />}
            onPress={() => setIsCreationActive(true)}
          >
            Create New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projectsArray?.map((project) => (
          <ProjectCard
            project={project}
            setShowDetails={setShowDetails}
            setCurrentProjectId={setCurrentProjectId}
          />
        ))}
      </div>
    </div>
  );
};
