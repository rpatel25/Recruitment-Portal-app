import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { IOption } from "@/types/filter.type";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface IPowerFiltersProps {
  diversity?: string[];
  security_clearance?: string[];
  isResetAll: boolean;
}

export const PowerFilters: React.FC<IPowerFiltersProps> = ({
  diversity = [],
  security_clearance = [],
  isResetAll,
}) => {
  const [selectedClearance, setSelectedClearance] = useState<IOption[]>([]);
  const [selectedDiversity, setSelectedDiversity] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (diversity.length > 0) {
      setSelectedDiversity(OptimizeArrayForMultiSelect(diversity));
    }
    if (security_clearance.length > 0) {
      setSelectedClearance(OptimizeArrayForMultiSelect(security_clearance));
    }
  }, [diversity, security_clearance]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        power_filter: {
          diversity: selectedDiversity.map((option) => option.value),
          security_clearance: selectedClearance.map((option) => option.value),
        },
      })
    );
  }, [selectedDiversity, selectedClearance]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedDiversity([]);
      setSelectedClearance([]);
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
      <h3 className="text-[#323130] text-base font-medium mb-2">
        Power Filters
      </h3>

      <div className="mb-4">
        <label
          className="block text-[#323130] text-sm font-medium mb-1"
          htmlFor="diversity"
        >
          Diversity
        </label>
        <CustomMultiSelect
          category="powerfilter"
          selectedOptions={selectedDiversity}
          setSelectedOptions={setSelectedDiversity}
          addOption={false}
        />
      </div>

      <div className="">
        <label
          className="block text-[#323130] text-sm font-medium mb-1"
          htmlFor="clearance"
        >
          Security Clearance
        </label>
        <CustomMultiSelect
          category="powerfilter"
          selectedOptions={selectedClearance}
          setSelectedOptions={setSelectedClearance}
          addOption={false}
        />
      </div>
    </div>
  );
};
