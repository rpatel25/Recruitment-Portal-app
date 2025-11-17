import { useAppDispatch } from "@/store/hooks";
import { setJobFilters } from "@/store/slice/filterSlice";
import { cn } from "@heroui/theme";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../custom/CustomDropdown";

interface IContactInfo {
  contact_info?: string;
  isResetAll: boolean;
}

export const ContactInfo: React.FC<IContactInfo> = ({
  isResetAll,
  contact_info,
}) => {
  const [selectedContactInfo, setSelectedContactInfo] = useState("");

  const dispatch = useAppDispatch();

  const contactInfoDropDown = [
    "Only Mobile",
    "Only Email",
    "Mobile or Email",
    "Any",
  ];

  useEffect(() => {
    if (contact_info) {
      setSelectedContactInfo(contact_info);
    }
  }, [contact_info]);

  useEffect(() => {
    dispatch(
      setJobFilters({
        contact_info: {
          contact_info: selectedContactInfo,
        },
      })
    );
  }, [selectedContactInfo]);

  useEffect(() => {
    if (isResetAll) {
      setSelectedContactInfo("");
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
        Contact Info
      </h3>

      <CustomDropdown
        onChangeFn={setSelectedContactInfo}
        optionLabel="label"
        options={contactInfoDropDown}
        placeholder="Contact Info"
        value={selectedContactInfo}
      />
    </div>
  );
};
