import { cn } from "@heroui/theme";
import React from "react";

interface IProps {
  onChangeCheckbox: () => void;
  checked: boolean;
  labelText?: string;
}

export const CustomCheckbox = ({
  labelText,
  onChangeCheckbox,
  checked,
}: IProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={onChangeCheckbox}
      />

      <div
        className={cn(
          "w-5 h-5 flex items-center justify-center",
          "rounded-lg border border-[#3B4CBF] peer-checked:border-[#3B4CBF] peer-checked:[&>svg]:block",
          "bg-white peer-checked:bg-[#3B4CBF]"
        )}
      >
        <svg
          className="hidden w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {labelText ? (
        <span className="text-sm font-medium text-[#323130]">{labelText}</span>
      ) : null}
    </label>
  );
};
