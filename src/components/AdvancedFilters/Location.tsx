import { useAppDispatch } from "@/store/hooks";
import { useGetFilterDataQuery } from "@/store/services/ApiRequest";
import { setJobFilters } from "@/store/slice/filterSlice";
import { OptimizeArrayForMultiSelect } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";
import { IOption } from "@/types/filter.type";
import { CustomMultiSelect } from "../custom/CustomMultiSelect";

interface ILocationProps {
  place?: string[];
  range?: string;
  isResetAll: boolean;
}

export const Location: React.FC<ILocationProps> = ({
  isResetAll,
  place = [],
  range = "",
}) => {
  const [selectedRange, setSelectedRange] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();

  const { data } = useGetFilterDataQuery("location");
  const locationDropDown = data?.data?.dropdown ?? [];

  useEffect(() => {
    if (place.length > 0) {
      setSelectedLocations(OptimizeArrayForMultiSelect(place));
    }
    if (range) setSelectedRange(range);
  }, [place, range]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        location: {
          place: selectedLocations.map((option) => option.value),
          range: selectedRange,
        },
      })
    );
  }, [selectedLocations, selectedRange]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedLocations([]);
      setSelectedRange("");
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
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-[#323130] text-base font-medium mb-2">Location</h3>

        <CustomDropdown
          isInline
          onChangeFn={setSelectedRange}
          optionLabel="label"
          options={locationDropDown}
          placeholder="Select the range"
          value={selectedRange}
        />
      </div>

      <CustomMultiSelect
        category="location"
        selectedOptions={selectedLocations}
        setSelectedOptions={setSelectedLocations}
        addOption={false}
      />
    </div>
  );
};
