import React from "react";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import { getUsernameFromEmail } from "@/util/getUserNameFromEmail";

interface DemoBookingProps {
  userName: string;
  credit: number;
  handleSignOut: () => void;
}

export const DemoBooking = ({
  userName,
  credit,
  handleSignOut,
}: DemoBookingProps) => {
  const name = getUsernameFromEmail(userName);

  return (
    <div className="">
      <header className="flex justify-between items-center xl:px-10 2xl:px-16 xl:py-4 2xl:py-6 bg-white w-full">
        <img src="/icons/logo.svg" className="w-48 h-8" />
        <HeaderProfileDropdown
          mail={userName}
          credits={credit}
          signOut={handleSignOut}
        />
      </header>

      <div className="w-full h-[92vh] bg-gray-300 flex flex-col items-center justify-center gap-3">
        <h2 className="text-[#864CEF] text-[45px] font-medium text-center">
          Welcome to Lookout AI, <span className="text-black">{name}</span>
        </h2>

        <p className="text-black text-2xl text-center w-6/12">
          Book a quick call with our team to activate your access and see how
          LUCA can transform your hiring.
        </p>

        <div className="w-full flex justify-center">
          <iframe
            src="https://calendly.com/lookoutai-info"
            width="600"
            height="550"
            style={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            allow="camera; microphone; fullscreen"
            title="Book a demo with LookoutAI"
          />
        </div>
      </div>
    </div>
  );
};
