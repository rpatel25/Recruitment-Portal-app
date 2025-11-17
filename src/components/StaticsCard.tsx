import React from "react";
import { StaticsCardType } from "../util/Types";
import { cn } from "@heroui/theme";

const StaticsCard: React.FC<
  StaticsCardType & { highlight?: boolean; purpleHighlight?: boolean }
> = ({ title, metrics, icon, highlight, purpleHighlight }) => {
  return (
    <div
      className={cn(
        "min-w-[240px] px-6 py-4 border border-solid rounded-2xl",
        highlight
          ? "bg-gradient-to-r from-[#263BC7] to-[#327FFF] border-transparent"
          : purpleHighlight
          ? "bg-gradient-to-r from-[#483FC5] to-[#864CEF] border-transparent"
          : "bg-[#fff] border-[#DDDFE3]"
      )}
    >
      <div className="flex justify-between">
        <div>
          <h3
            className={cn(
              "text-base font-medium mb-4",
              highlight || purpleHighlight ? "text-white" : "text-[#706F6E]"
            )}
          >
            {title}
          </h3>
          <h3
            className={
              highlight || purpleHighlight
                ? "text-white text-2xl font-normal"
                : "text-[#323130] text-2xl font-normal"
            }
          >
            {metrics}
          </h3>
        </div>
        <div className={highlight || purpleHighlight ? "rounded-xl p-2" : ""}>
          <img
            src={`/icons/${icon}.svg`}
            className="h-10 w-10 border rounded-lg"
            alt="icon"
          />
        </div>
      </div>
    </div>
  );
};

export default StaticsCard;
