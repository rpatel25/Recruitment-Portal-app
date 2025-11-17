import React from "react";
import { cn } from "@heroui/theme";
import { integratedAccounts } from "@/util/data";
import { Button } from "@heroui/react";

export const Accounts = () => {
  return (
    <div
      className={cn(
        "w-full bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
        "rounded-2xl p-4"
      )}
    >
      <div className="mb-4">
        <h3 className="text-white text-xl font-semibold">
          Integrated Accounts
        </h3>
        <h6 className="text-white text-sm">
          Manage your current integrated accounts
        </h6>
      </div>

      <div className="w-full h-[1px] bg-[#ffffff66] mb-4" />

      <div className="flex flex-col gap-1">
        {integratedAccounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={account.icon} alt={account.id} className="w-7 h-7" />

              <div>
                <h5 className="text-white text-base font-medium">
                  {account.label}
                </h5>
                <h6 className="text-white text-sm">{account.subLabel}</h6>
              </div>
            </div>

            <Button
              size="sm"
              variant="solid"
              startContent={
                <img src="/icons/plus_icon_blue.svg" className="" />
              }
              className={cn(
                "bg-white rounded-lg p-2",
                "text-[#483FC5] text-sm font-medium"
              )}
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
