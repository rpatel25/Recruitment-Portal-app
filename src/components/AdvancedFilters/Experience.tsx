import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { cn } from "@heroui/theme";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";

interface IExperienceProps {
  min_years?: number;
  max_year?: number;
  time_spent_at_current_role?: {
    dropdown?: string;
    min?: string;
    max?: string;
  };
  min_average_tenure?: string;
  isResetAll: boolean;
}

export const Experience: React.FC<IExperienceProps> = ({
  max_year = 0,
  min_average_tenure = "",
  min_years = 0,
  time_spent_at_current_role: { dropdown = "", max = "", min = "" } = {},
  isResetAll,
}) => {
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(0);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [selectedMinTime, setSelectedMinTime] = useState("");
  const [selectedMaxTime, setSelectedMaxTime] = useState("");
  const [selectedMinAvgTenure, setSelectedMinAvgTenure] = useState("");

  const dispatch = useAppDispatch();

  const { data } = useGetFilterDataQuery("experience");
  const expDropDown = data?.data?.dropdown ?? [];
  const timeSpentMin = data?.data?.time_spent_min ?? [];
  const timeSpentMax = data?.data?.time_spent_max ?? [];

  useEffect(() => {
    if (min_years) setMinExperience(min_years);
    if (max_year) setMaxExperience(max_year);
    if (min_average_tenure) setSelectedMinAvgTenure(min_average_tenure);
    if (dropdown) setSelectedDropdown(dropdown);
    if (min) setSelectedMinTime(min);
    if (max) setSelectedMaxTime(max);
  }, [min_years, max_year, min_average_tenure, dropdown, min, max]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        experience: {
          min_years: minExperience,
          max_year: maxExperience,
          time_spent_at_current_role: {
            dropdown: selectedDropdown,
            min: selectedMinTime,
            max: selectedMaxTime,
          },
          min_average_tenure: selectedMinAvgTenure,
        },
      })
    );
  }, [
    minExperience,
    maxExperience,
    selectedDropdown,
    selectedMinTime,
    selectedMaxTime,
    selectedMinAvgTenure,
  ]);

  useEffect(() => {
    if (isResetAll) {
      setMinExperience(0);
      setMaxExperience(0);
      setSelectedDropdown("");
      setSelectedMinTime("");
      setSelectedMaxTime("");
      setSelectedMinAvgTenure("");
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
      <h3 className="text-[#323130] text-base font-medium mb-2">Experience</h3>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Min Experience (Years)
          </label>
          <InputNumber
            value={minExperience}
            onValueChange={(e) => setMinExperience(e.value ?? 0)}
            placeholder="Enter minimum years"
            inputStyle={{
              height: "36px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 8,
              // backgroundColor: "transparent",
            }}
          />
        </div>
        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Max Experience (Years)
          </label>
          <InputNumber
            value={maxExperience}
            onValueChange={(e) => setMaxExperience(e.value ?? 0)}
            placeholder="Enter maximum years"
            inputStyle={{
              height: "36px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 8,
              // backgroundColor: "transparent",
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Time Spent at Current Role
          </label>
          <CustomDropdown
            isInline
            onChangeFn={setSelectedDropdown}
            optionLabel="label"
            options={expDropDown}
            placeholder="Current Only"
            value={selectedDropdown}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomDropdown
            onChangeFn={setSelectedMinTime}
            optionLabel="label"
            options={timeSpentMin}
            placeholder="No Minimum"
            value={selectedMinTime}
          />

          <CustomDropdown
            onChangeFn={setSelectedMaxTime}
            optionLabel="label"
            options={timeSpentMax}
            placeholder="No Maximum"
            value={selectedMaxTime}
          />
        </div>
      </div>

      {/* <div className="">
        <label className="block text-[#323130] text-sm font-medium mb-1">
          Minimum Average Tenure
        </label>
        <CustomDropdown
          onChangeFn={setSelectedMinAvgTenure}
          optionLabel="label"
          options={minAvgTenure}
          placeholder="No Minimum"
          value={selectedMinAvgTenure}
        />
      </div> */}
    </div>
  );
};
