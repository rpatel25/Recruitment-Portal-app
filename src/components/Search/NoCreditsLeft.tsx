import { Button, cn } from "@heroui/react";
import React from "react";

export const NoCreditsLeft = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src="/icons/wallet.svg" alt="wallet" className="w-7 h-7" />
      <h3 className="text-black text-xl font-medium">
        Oops, You're Out of Creedits!
      </h3>
      <p className="w-4/5 text-center text-[#323130] text-sm font-normal">
        Looks like you've used all your available credits. Please contact your
        administrator or upgrade your plan to continue.
      </p>
      <div className="flex items-center gap-2">
        <Button
          className={cn(
            "bg-[#3B4CBF]",
            "rounded-lg shadow-[0px_0px_6px_0px_rgba(0,0,0,0.20)]",
            "text-white text-sm font-medium"
          )}
        >
          Upgrade Plan
        </Button>
        <Button
          variant="light"
          className={cn("rounded-lg", "text-[#3B4CBF] text-sm font-medium")}
        >
          Contact Admin
        </Button>
      </div>
    </div>
  );
};
