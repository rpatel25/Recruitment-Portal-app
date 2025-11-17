import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { IOption } from "@/types/filter.type";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface IIndustryProps {
  industries?: string[];
  isResetAll: boolean;
}

export const Industry = ({ isResetAll, industries = [] }: IIndustryProps) => {
  const [selectedIndustries, setSelectedIndustries] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (industries.length > 0) {
      setSelectedIndustries(OptimizeArrayForMultiSelect(industries));
    }
  }, [industries]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        industries: selectedIndustries.map((options) => options.value),
      })
    );
  }, [selectedIndustries]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedIndustries([]);
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
      <h3 className="text-[#323130] text-base font-medium mb-2">Industries</h3>

      <CustomMultiSelect
        category="industry"
        selectedOptions={selectedIndustries}
        setSelectedOptions={setSelectedIndustries}
        addOption={false}
        isIndustry
      />
    </div>
  );
};
