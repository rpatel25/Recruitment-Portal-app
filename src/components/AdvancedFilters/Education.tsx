import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { cn } from "@heroui/theme";
import { Calendar } from "primereact/calendar";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";

interface IEducationProps {
  degree?: string;
  field?: string;
  min_graduation_year?: string;
  max_graduation_year?: string;
  isResetAll: boolean;
}

export const Education: React.FC<IEducationProps> = ({
  isResetAll,
  degree: degree_requirement,
  field,
  min_graduation_year,
  max_graduation_year,
}) => {
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [minGradYear, setMinGradYear] = useState<Date | null>(null);
  const [maxGradYear, setMaxGradYear] = useState<Date | null>(null);

  const dispatch = useAppDispatch();

  const { data } = useGetFilterDataQuery("education");
  const educationDropDown = data?.data?.dropdown ?? [];
  const degree = data?.data?.degree ?? [];

  useEffect(() => {
    if (degree_requirement) setSelectedRequirement(degree_requirement);
    if (field) setSelectedDegree(field);
    if (min_graduation_year) setMinGradYear(new Date(min_graduation_year));
    if (max_graduation_year) setMaxGradYear(new Date(max_graduation_year));
  }, [degree_requirement, field, min_graduation_year, max_graduation_year]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        education: {
          degree: selectedRequirement,
          field: selectedDegree,
          min_graduation_year: minGradYear
            ? minGradYear.getFullYear().toString()
            : "",
          maxGradYear: maxGradYear ? maxGradYear.getFullYear().toString() : "",
        },
      })
    );
  }, [selectedRequirement, selectedDegree, minGradYear, maxGradYear]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedRequirement("");
      setSelectedDegree("");
      setMinGradYear(null);
      setMaxGradYear(null);
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
      <h3 className="text-[#323130] text-base font-medium mb-2">Education</h3>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Degree Requirements
          </label>

          <CustomDropdown
            onChangeFn={setSelectedRequirement}
            optionLabel="label"
            options={educationDropDown}
            placeholder="No Minimum"
            value={selectedRequirement}
          />
        </div>
        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Degree Fields of Study
          </label>
          <CustomDropdown
            onChangeFn={setSelectedDegree}
            optionLabel="label"
            options={degree}
            placeholder="Regular"
            value={selectedDegree}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Graduation Year (Min)
          </label>
          <Calendar
            id="yearPicker_minGrad"
            value={minGradYear}
            onChange={(e) => setMinGradYear(e.value as Date)}
            placeholder="Founded Year"
            view="year"
            dateFormat="yy"
            showIcon
            className={cn("w-full md:w-20rem", "flex items-center")}
          />
        </div>
        <div className="flex-1">
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Graduation Year (Max)
          </label>
          <Calendar
            id="yearPicker_maxGrad"
            value={maxGradYear}
            onChange={(e) => setMaxGradYear(e.value as Date)}
            placeholder="Founded Year"
            view="year"
            dateFormat="yy"
            showIcon
            className={cn("w-full md:w-20rem", "flex items-center")}
          />
        </div>
      </div>
    </div>
  );
};
