import { ProgressBar } from "primereact/progressbar";
import React from "react";

export const CreditConfirmation = () => {
  return (
    <div>
      <p className="text-[#323130] text-base mb-2">
        This search will deduct{" "}
        <span className="text-[#3B4CBF] text-lg font-medium">20 credits</span>{" "}
        from your balance.
      </p>

      <div className="flex items-center justify-center mb-2">
        <img src="/icons/coins.svg" />
      </div>

      <p className="text-[#323130] text-base mb-2">
        Are you sure you want to proceed?
      </p>

      <ProgressBar value={90} showValue={false} className="h-2"></ProgressBar>
    </div>
  );
};
