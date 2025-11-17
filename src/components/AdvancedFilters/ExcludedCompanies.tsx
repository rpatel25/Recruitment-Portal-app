import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { IOption } from "@/types/filter.type";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface IExcludedCompanies {
  place?: string[];
  isResetAll: boolean;
}

export const ExcludedCompanies: React.FC<IExcludedCompanies> = ({
  isResetAll,
  place = [],
}) => {
  const [selectedCompanies, setSelectedCompanies] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (place.length > 0) {
      setSelectedCompanies(OptimizeArrayForMultiSelect(place));
    }
  }, [place]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        excluded_companies: {
          place: selectedCompanies.map((option) => option.value),
        },
      })
    );
  }, [selectedCompanies]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedCompanies([]);
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
        Excluded Companies
      </h3>
      <CustomMultiSelect
        category="company"
        selectedOptions={selectedCompanies}
        setSelectedOptions={setSelectedCompanies}
        addOption={true}
      />
    </div>
  );
};
