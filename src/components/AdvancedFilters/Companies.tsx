import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";
import { IOption } from "@/types/filter.type";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface ICompanies {
  preferred?: string[];
  company_size?: string;
  company_hq_location?: string;
  founded_after?: string;
  period?: string;
  isResetAll: boolean;
  past?: string[];
}

export const Companies: React.FC<ICompanies> = ({
  isResetAll,
  preferred = [],
  company_hq_location,
  company_size,
  founded_after,
  period,
  past = [],
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<IOption[]>([]);
  const [selectedPastCompanies, setSelectedPastCompanies] = useState<IOption[]>(
    []
  );
  const [selectedCompanySize, setSelectedCompanySize] = useState("");
  const [selectedCompanyHqLocation, setSelectedCompanyHqLocation] =
    useState("");
  const [foundedYear, setFoundedYear] = useState<Date | null>(null);

  const dispatch = useAppDispatch();

  const { data } = useGetFilterDataQuery("companies");
  const companySize = data?.data?.company_size ?? [];

  useEffect(() => {
    if (period) {
      setSelectedPeriod(period);
    }
    if (preferred && preferred.length > 0) {
      setSelectedCompanies(OptimizeArrayForMultiSelect(preferred));
    }
    if (company_size) {
      setSelectedCompanySize(company_size);
    }
    if (company_hq_location) {
      setSelectedCompanyHqLocation(company_hq_location);
    }
    if (founded_after) {
      setFoundedYear(new Date(founded_after));
    }
    if (past && past.length > 0) {
      setSelectedPastCompanies(OptimizeArrayForMultiSelect(past));
    }
  }, [
    period,
    preferred,
    company_size,
    company_hq_location,
    founded_after,
    past,
  ]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        companies: {
          period: selectedPeriod,
          preferred: selectedCompanies.map((option) => option.value),
          company_size: selectedCompanySize,
          company_hq_location: selectedCompanyHqLocation,
          founded_after: foundedYear
            ? foundedYear.getFullYear().toString()
            : "",
          past: selectedPastCompanies.map((option) => option.value),
        },
      })
    );
  }, [
    selectedPeriod,
    selectedCompanies,
    selectedCompanySize,
    selectedCompanyHqLocation,
    foundedYear,
    selectedPastCompanies,
  ]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedPeriod("");
      setSelectedCompanies([]);
      setSelectedCompanySize("");
      setSelectedCompanyHqLocation("");
      setFoundedYear(null);
      setSelectedPastCompanies([]);
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
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-[#323130] text-[16px] font-medium mb-2">
          Companies
        </h3>

        {/* <CustomDropdown
          isInline
          onChangeFn={setSelectedPeriod}
          optionLabel="label"
          options={companyDropDown}
          placeholder="Any Proficiency level"
          value={selectedPeriod}
        /> */}
      </div>

      <div className="mb-4">
        <CustomMultiSelect
          category="company"
          selectedOptions={selectedCompanies}
          setSelectedOptions={setSelectedCompanies}
          addOption={true}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Company Size
          </label>
          <CustomDropdown
            onChangeFn={setSelectedCompanySize}
            optionLabel="label"
            options={companySize}
            placeholder="Company Size"
            value={selectedCompanySize}
          />
        </div>

        <div>
          <label className="block text-[#323130] text-sm font-medium mb-1">
            Company HQ Location
          </label>
          <InputText
            value={selectedCompanyHqLocation}
            onChange={(e) => setSelectedCompanyHqLocation(e.target.value)}
            placeholder="Company HQ Location"
            style={{
              height: "36px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 8,
            }}
          />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-[#323130] text-base font-medium mb-2">
          Past Companies
        </h3>
      </div>

      <div className="mb-4">
        <CustomMultiSelect
          category="company"
          selectedOptions={selectedPastCompanies}
          setSelectedOptions={setSelectedPastCompanies}
          addOption={true}
        />
      </div>
    </div>
  );
};
