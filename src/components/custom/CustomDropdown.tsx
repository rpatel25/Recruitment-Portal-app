import { classNames } from "@/util/classNames";
import { OptimizeArray } from "@/util/OptimizeArray";
import { cn } from "@heroui/theme";
import { Dropdown } from "primereact/dropdown";

interface IProps {
  isInline?: boolean;
  options: string[];
  value: string;
  onChangeFn: (e: string) => void;
  optionLabel: string;
  placeholder: string;
  isProfile?: boolean;
}

export const CustomDropdown = ({
  isInline,
  onChangeFn,
  optionLabel,
  options,
  placeholder,
  value,
  isProfile,
}: IProps) => {
  return (
    <Dropdown
      options={OptimizeArray(options)}
      value={value}
      onChange={({ value }) => onChangeFn(value)}
      optionLabel={optionLabel}
      optionValue="value"
      placeholder={placeholder}
      className={cn(
        classNames.simpleFlex,
        classNames.dropdownBorder,
        isInline
          ? "h-6 bg-[#EBEDF9] rounded-md"
          : "w-full md:w-20rem h-9 rounded-lg",
        isProfile
          ? "h-12 bg-white rounded-xl border border-solid border-[#CBD5E1]"
          : ""
      )}
    />
  );
};
