import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";
import { IOption } from "@/types/filter.type";

interface ISkillsKeywordsProps {
  skills_and_keywords?: string[];
  isResetAll: boolean;
}

export const SkillsKeywords: React.FC<ISkillsKeywordsProps> = ({
  isResetAll,
  skills_and_keywords = [],
}) => {
  const [selectedSkills, setSelectedSkills] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (skills_and_keywords.length > 0) {
      setSelectedSkills(OptimizeArrayForMultiSelect(skills_and_keywords));
    }
  }, [skills_and_keywords]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        skills_and_keywords: selectedSkills.map((options) => options.value),
      })
    );
  }, [selectedSkills]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedSkills([]);
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
        Skills and Keywords
      </h3>

      <CustomMultiSelect
        category="skill"
        selectedOptions={selectedSkills}
        setSelectedOptions={setSelectedSkills}
        addOption={true}
      />
    </div>
  );
};
