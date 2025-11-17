import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";
import { IOption } from "@/types/filter.type";

interface IJobDetailsProps {
  title?: string[];
  required_contact?: string;
  isResetAll: boolean;
}

export const JobDetails = ({
  isResetAll,
  required_contact,
  title = [],
}: IJobDetailsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<string>("");

  const dispatch = useAppDispatch();

  useGetFilterDataQuery("jd");

  useEffect(() => {
    if (title?.length > 0)
      setSelectedOptions(OptimizeArrayForMultiSelect(title));
    if (required_contact) setSelectedInfo(required_contact);
  }, [title]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        job_details: {
          title: selectedOptions.map((options) => options.value),
          required_contact: selectedInfo,
        },
      })
    );
  }, [selectedOptions]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedOptions([]);
      setSelectedInfo("");
    }
  }, [isResetAll]);

  return (
    <div
      className={cn(
        "bg-[#f5f5f599]",
        "p-4",
        "shadow-sm border rounded-lg border-solid border-[#F1F1F1]"
      )}
    >
      <h3 className="text-[#323130] text-base font-medium mb-2">Job Details</h3>
      <div className="mb-4">
        <label
          className="block text-[#323130] text-sm font-medium mb-1"
          htmlFor="jobTitle"
        >
          Job Title
        </label>

        <CustomMultiSelect
          category="job"
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          addOption={true}
        />
      </div>
    </div>
  );
};
