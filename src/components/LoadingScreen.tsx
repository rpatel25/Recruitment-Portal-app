import React from "react";
import { cn } from "@heroui/theme";
import { ProgressBar } from "primereact/progressbar";

export const LoadingScreen = () => {
  return (
    <div
      className={cn(
        "w-screen h-screen bg-white",
        "flex flex-col items-center justify-center gap-9"
      )}
    >
      <div className="flex items-center gap-2">
        <img src="/icons/logo_symbol.svg" className="w-9 h-9" />
        <img src="/icons/logo.svg" className="w-48 h-7" />
      </div>

      <h4
        className={cn(
          "bg-gradient-to-r from-purple-600 to-blue-500",
          "text-transparent bg-clip-text"
        )}
      >
        Hire Smarter, Faster and Better
      </h4>

      <div className="flex items-center space-x-3 w-64">
        <ProgressBar value={10} showValue={false} className="flex-1 h-[3px]" />
        <span className="text-[#171717] text-xl font-semibold">10%</span>
      </div>
    </div>
  );
};
