import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";
import { IOption } from "@/types/filter.type";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface ILanguageProps {
  dropdown?: string;
  value?: string[];
  isResetAll: boolean;
}

export const Languages: React.FC<ILanguageProps> = ({
  isResetAll,
  dropdown,
  value: addedLanguages = [],
}) => {
  const [selectedInfo, setSelectedInfo] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  const { data } = useGetFilterDataQuery("languages");
  const langDropDown = data?.data?.dropdown ?? [];

  useEffect(() => {
    if (dropdown) setSelectedInfo(dropdown);
    if (addedLanguages.length > 0) {
      setSelectedLanguages(OptimizeArrayForMultiSelect(addedLanguages));
    }
  }, [dropdown, addedLanguages]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        language: {
          dropdown: selectedInfo,
          value: selectedLanguages.map((option) => option.value),
        },
      })
    );
  }, [selectedInfo, selectedLanguages]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedInfo("");
      setSelectedLanguages([]);
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
      <div className="flex items-baseline gap-2 mb-3">
        <h3 className="text-[#323130] text-base font-medium mb-2">Languages</h3>

        <CustomDropdown
          isInline
          onChangeFn={setSelectedInfo}
          optionLabel="label"
          options={langDropDown}
          placeholder="Any Proficiency level"
          value={selectedInfo}
        />
      </div>

      <CustomMultiSelect
        category="language"
        selectedOptions={selectedLanguages}
        setSelectedOptions={setSelectedLanguages}
        addOption={false}
      />
    </div>
  );
};
