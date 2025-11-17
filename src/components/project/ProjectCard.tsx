/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select, SelectItem } from "@heroui/react";
import { cn } from "@heroui/theme";
import { ProgressBar } from "primereact/progressbar";
import React, { useState } from "react";
import moment from "moment";
import { IProjectType, StatusType } from "@/types/project.type";
import { colorMap, iconMap, projectStatusTypes } from "@/util/data";
import { useUpdateProjectStatusMutation } from "@/store/services/ApiRequest";

interface IProps {
  project: IProjectType;
  setShowDetails: (val: boolean) => void;
  setCurrentProjectId: (val: string) => void;
}

export const ProjectCard = ({
  project,
  setShowDetails,
  setCurrentProjectId,
}: IProps) => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType | undefined>(
    projectStatusTypes.find((a) => a.status === project.status)?.key
  );
  const [statusColor, setStatusColor] = useState(colorMap[project.status]);
  const [statusIcon, setStatusIcon] = useState(iconMap[project.status]);
  const [updateStatus, { isError, isSuccess, error }] =
    useUpdateProjectStatusMutation();

  const onStatusChange = async (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { ...payload } = project;

    await updateStatus({
      ...payload,
      status: ev.target.value as StatusType,
    });
    setSelectedStatus(ev.target.value as StatusType);
    setStatusColor(colorMap[ev.target.value as StatusType]);
    setStatusIcon(iconMap[ev.target.value as StatusType]);
  };

  const viewDetails = () => {
    setCurrentProjectId(project._id);
    setShowDetails(true);
  };

  return (
    <div
      className={cn(
        "max-w-[400px] p-4",
        "border rounded-2xl border-solid border-[#DDDFE3]"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Select
          defaultSelectedKeys={selectedStatus ? [selectedStatus] : ""}
          onChange={(ev) => onStatusChange(ev)}
          startContent={
            <img
              src={`/icons/${statusIcon}.svg`}
              alt="status_icon"
              className="cursor-pointer mr-2"
            />
          }
          classNames={{
            base: "max-w-[120px] rounded-lg",
            trigger: `${statusColor} text-center rounded-lg text-black text-sm`,
            popoverContent: "bg-white text-black",
            selectorIcon: "absolute right-0 text-black",
            value: "text-black text-sm",
          }}
        >
          {projectStatusTypes.map((status) => (
            <SelectItem key={status.key}>{status.status}</SelectItem>
          ))}
        </Select>

        {isError && (
          <p className="text-red-500">
            Error updating user: {(error as any)?.data?.message}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 text-xs font-medium">
            Status updated successfully!
          </p>
        )}

        <img
          src="/icons/luca_menu.svg"
          alt="Menu"
          //   onClick={toggleDropdown}
          className="cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-[#323130] text-base font-semibold leading-[22px] mb-1">
          {project.name}
        </h4>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <img
              src="/icons/timer.svg"
              alt="Timer"
              className="cursor-pointer mr-1"
            />
            <h6 className="text-[#323130] text-sm font-semibold">Full Time</h6>
          </div>

          <div className="flex items-center">
            <img
              src="/icons/onsite.svg"
              alt="Onsite"
              className="cursor-pointer mr-1"
            />
            <h6 className="text-[#323130] text-sm font-semibold">On Site</h6>
          </div>

          <div className="flex items-center">
            <img
              src="/icons/project_location.svg"
              alt="Location"
              className="cursor-pointer mr-1"
            />
            <h6 className="text-[#323130] text-sm font-semibold">
              {project.job_location}
            </h6>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-[#F6F3FF]",
          "border border-solid border-[#EAE5F9] rounded-lg",
          "py-3 px-4 mb-4",
          "flex items-center justify-between"
        )}
      >
        <div>
          <h4 className="text-[#323130] text-base font-semibold">55</h4>
          <p className="text-[#323130] text-sm font-normal">
            Candidates applied
          </p>
        </div>
        <div className="bg-[#E2DCF6] w-[1px] h-8" />
        <div>
          <h4 className="text-[#323130] text-base font-semibold">28</h4>
          <p className="text-[#323130] text-sm font-normal">
            Interviews Completed
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-1">
          <img
            src="/icons/calendar.svg"
            alt="Calendar"
            className="cursor-pointer mr-1"
          />
          <h6 className="text-[#323130] text-xs font-medium">
            Created on {moment(project.created_at).format("MMMM Do YYYY")}
          </h6>
        </div>

        <ProgressBar value={90} showValue={false} className="h-2"></ProgressBar>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[#323130] text-xs font-medium">
          Created by{" "}
          <span
            className={cn(
              "text-[#3B4CBF]",
              "cursor-pointer",
              "underline decoration-solid decoration-auto underline-offset-auto"
            )}
          >
            {project.members.find((a) => a.id === project.created_by.id)?.email}
          </span>
        </p>

        <Button
          variant="light"
          className="text-[#3B4CBF] text-xs font-medium text-center"
          endContent={<img src="/icons/right_arrow.svg" className="w-4 h-4" />}
          onPress={viewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
