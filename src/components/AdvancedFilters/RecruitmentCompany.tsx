import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { cn } from "@heroui/theme";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

interface IProps {
  recruiting_company: string | undefined | null;
  isResetAll: boolean;
}

export const RecruitmentCompany = ({
  recruiting_company,
  isResetAll,
}: IProps) => {
  const [recruitmentCompanies, setRecruitmentCompanies] = useState(
    recruiting_company ?? ""
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setJobFilters({
        recruiting_company: recruitmentCompanies,
      })
    );
  }, [recruitmentCompanies]);

  useEffect(() => {
    if (isResetAll) {
      setRecruitmentCompanies("");
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
      <h3 className="text-[#323130] text-[16px] font-medium mb-2">
        Client's company name
      </h3>
      <InputText
        value={recruitmentCompanies}
        onChange={(e) => setRecruitmentCompanies(e.target.value)}
        placeholder="Enter the client company name"
        // onValueChange={(e) => setMinExperience(e.value ?? 0)}
        style={{
          height: "36px",
          borderRadius: 8,
          border: "1px solid rgba(59,76,191,0.50)",
          padding: 8,
          // backgroundColor: "transparent",
        }}
        className={cn(
          "w-full md:w-20rem",
          "h-9 flex items-center",
          "rounded-lg border border-solid border-[rgba(59,76,191,0.50)] "
        )}
      />
    </div>
  );
};
