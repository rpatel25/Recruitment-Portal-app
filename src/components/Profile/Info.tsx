import React from "react";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";

export const Info = () => {
  return (
    <div
      className={cn(
        "w-full bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
        "rounded-2xl p-4 mb-4"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white text-xl font-semibold">
            Personal Information
          </h3>
          <h6 className="text-white text-sm">
            Turn on auto-join for specific meetings in your Home Calendar.
          </h6>
        </div>

        <Button
          variant="solid"
          className={cn(
            "bg-white rounded-lg px-1.5 py-3 mb-4",
            "text-[#483FC5] text-sm font-medium"
          )}
          startContent={<img src="/icons/edit_icon_blue.svg" alt="edit" />}
        >
          Edit Details
        </Button>
      </div>

      <div className="w-full h-[1px] bg-[#ffffff66] mb-4" />

      <div className="flex items-center gap-4">
        <img
          src="/icons/profile_picture.svg"
          className="w-20 h-20 rounded-none"
        />

        <div>
          <h4 className="text-white text-lg font-medium ">Alex Sanchez</h4>
          <h5 className="text-[#C0C0C0] text-sm font-medium mb-2">
            Senior Recruiter • AMZ-0004
          </h5>
          <div className="flex items-center">
            <img
              src="/icons/contact_icon_blue.svg"
              alt=""
              className="w-6 h-6 mr-2"
            />
            <h6 className="text-white text-sm mr-4">+61-000-000-0000</h6>
            <img
              src="/icons/mail_icon_blue.svg"
              alt=""
              className="w-6 h-6 mr-2"
            />
            <h6 className="text-white text-sm">alex@amazon.com</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
