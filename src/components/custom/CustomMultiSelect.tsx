import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import debounce from "lodash/debounce";
import { useLazyGetFilterDataByQueryTextQuery } from "@/store/services/ApiRequest";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { IOption } from "@/types/filter.type";
import { cn } from "@heroui/theme";
import { classNames } from "@/util/classNames";
import { industry_list } from "@/util/data";

interface MultiSelectProps {
  selectedOptions: IOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
  category: string;
  addOption: boolean;
  isIndustry?: boolean;
}

export const CustomMultiSelect = ({
  setSelectedOptions,
  category,
  selectedOptions,
  addOption,
  isIndustry,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [trigger, { data: queryData }] = useLazyGetFilterDataByQueryTextQuery();

  //   Fetch options from API
  const fetchOptions = async (search: string) => {
    if (!search) return;
    setLoading(true);
    try {
      await trigger({ category: category, id: search });

      if (queryData) {
        const requiredQueryData: IOption[] = OptimizeArrayForMultiSelect(
          queryData.data
        );

        setOptions(requiredQueryData); // Update options if API returns results
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced API call
  const debouncedFetch = debounce(fetchOptions, 500);

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedFetch(value);
  };

  // Handle selection
  const handleChange = (newValue: MultiValue<IOption>) => {
    setSelectedOptions((newValue as IOption[]) || []);
  };

  // Allow adding a new option if no results are found
  const handleCreateOption = (inputValue: string) => {
    const newOption: IOption = { label: inputValue, value: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setSelectedOptions((prev) => [...prev, newOption]);
    setInputValue("");
  };

  return (
    <Select
      isMulti
      options={
        !isIndustry ? options : OptimizeArrayForMultiSelect(industry_list)
      }
      value={selectedOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isLoading={loading}
      noOptionsMessage={() =>
        inputValue && addOption ? (
          <button
            onClick={() => handleCreateOption(inputValue)}
            className="text-blue-500"
          >
            Add "{inputValue}"
          </button>
        ) : inputValue.length == 1 ? (
          "Give minimum 2 characters"
        ) : (
          "No options found"
        )
      }
      placeholder="Select or type to search..."
      className={cn("w-full rounded-md", classNames.dropdownBorder)}
    />
  );
};
