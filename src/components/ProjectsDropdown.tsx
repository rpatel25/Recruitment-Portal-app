import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useGetProjectsQuery } from "@/store/services/ApiRequest";
import { IProjectType } from "@/types/project.type";
import { getDateDifference } from "@/util/handleDateTime";

interface ProjectsDropdownProps {
  children: (props: { onClick: () => void }) => React.ReactNode;
}

export default function ProjectsDropdown({ children }: ProjectsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: projectsData, isLoading } = useGetProjectsQuery();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => setIsOpen(!isOpen);

  // Get all projects and sort by created_at (most recent first)
  const allProjects = [...(projectsData?.data || [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div ref={dropdownRef} className="relative">
      {children({ onClick: handleClick })}

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          {/* Main dropdown container */}
          <div
            className="w-[340px] h-fit flex-shrink-0 rounded-[10px] bg-white"
            style={{
              boxShadow:
                "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Frame 1: Recent projects header */}
            <div className="flex w-[340px] h-[47px] px-5 py-2.5 items-center gap-2.5 flex-shrink-0 border-b border-solid border-[#DDDFE3]">
              <Link
                href="/project?create=false"
                className="text-[#3B4CBF] text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                All projects
              </Link>
            </div>

            {/* Frame 2: Projects list */}
            <div className="flex w-[340px] p-2.5 flex-col items-start max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="w-full h-20 flex items-center justify-center">
                  <span className="text-[#706F6E] text-sm">
                    Loading projects...
                  </span>
                </div>
              ) : allProjects.length === 0 ? (
                <div className="w-full h-20 flex items-center justify-center">
                  <span className="text-[#706F6E] text-sm">
                    No projects found
                  </span>
                </div>
              ) : (
                allProjects.map((project: IProjectType) => (
                  <Link
                    key={project._id}
                    href={`/project?id=${project._id}`}
                    className="w-[312px] h-[60px] p-2.5 flex flex-col justify-center items-start rounded-lg bg-[#EFF4FF] mb-2 hover:bg-[#E0E7FF] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-[#323130] text-base font-semibold">
                      {project.name} - {project.job_title}
                    </div>
                    <div className="text-[#706F6E] text-xs">
                      {project.company_hiring_for} . Created{" "}
                      {getDateDifference(project.created_at)} days ago
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Frame 3: Create project footer */}
            <div className="flex w-[340px] h-[47px] px-5 py-2.5 items-center gap-2.5 flex-shrink-0 border-t border-solid border-[#DDDFE3]">
              <Link
                href="/project?create=true"
                className="text-[#3B4CBF] text-base font-medium hover:text-[#2A3A9F] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
