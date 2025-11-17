import React from "react";
import { Info } from "./Info";
import { cn } from "@heroui/theme";
import { Password } from "./Password";
import { Meeting } from "./Meeting";
import { Language } from "./Language";
import { Accounts } from "./Accounts";
import { Options } from "./Options";

export const Profile = () => {
  return (
    <div
      className={cn(
        "  p-4 grow",
        "bg-white border border-solid border-[#B7C0FF] rounded-xl"
      )}
    >
      <Info />
      <Password />

      <div className="flex items-center justify-between gap-4 mb-4">
        <Meeting />
        <Language />
      </div>

      <div className="flex items-center justify-between gap-4">
        <Accounts />
        <Options />
      </div>
    </div>
  );
};
