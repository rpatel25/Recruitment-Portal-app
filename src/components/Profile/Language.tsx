import React from "react";
import { cn } from "@heroui/theme";
import { CustomDropdown } from "../custom/CustomDropdown";

export const Language = () => {
  return (
    <div
      className={cn(
        "w-full bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
        "rounded-2xl p-4"
      )}
    >
      <div className="mb-4">
        <h3 className="text-white text-xl font-semibold">Languages</h3>
        <h6 className="text-white text-sm">
          Default language for your conversations
        </h6>
      </div>

      <div className="w-full h-[1px] bg-[#ffffff66] mb-4" />

      <CustomDropdown
        onChangeFn={() => null}
        optionLabel="label"
        options={[]}
        placeholder="English(US)"
        value=""
        isProfile
      />
    </div>
  );
};
