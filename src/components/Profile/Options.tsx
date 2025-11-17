import React from "react";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/react";
import { profileOptions } from "@/util/data";

export const Options = () => {
  const onCLickOption = (id: string) => {
    console.log(id);
  };

  return (
    <div
      className={cn(
        "w-full bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
        "rounded-2xl p-4",
        "flex flex-col gap-2"
      )}
    >
      {profileOptions.map((option) => (
        <div key={option.id} className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 bg-[#ffffff40] rounded-full",
              "flex items-center justify-center"
            )}
          >
            <img src={option.icon} alt="" className="w-6 h-6" />
          </div>

          <Button
            variant="light"
            className={cn("p-0", "text-white text-xl")}
            onPress={() => onCLickOption(option.id)}
          >
            {option.label}
          </Button>
        </div>
      ))}
    </div>
  );
};
