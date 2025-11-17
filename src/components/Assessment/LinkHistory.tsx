import React, { useState } from "react";
import { cn } from "@heroui/theme";
import { classNames } from "@/util/classNames";
import { Button } from "@heroui/react";
import SendEmail from "./SendEmail";



export const LinkHistory = ( ) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  const [link] = useState("https://www.externallink.com");

    return (
      <div className="flex flex-col px-1 gap-4">
        <div className="bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-2xl p-2">
          <div
            className={cn(
              "bg-white/25 px-3 py-1",
              "rounded-xl border border-solid border-[#483FC5]",
              "flex items-center justify-between mb-2"
            )}
          >
            <span className="text-white text-base font-medium flex items-center gap-2">
                Frontend Developer Assessment for Infosys
                <img src="/icons/edit_white.svg" alt="edit_white" className="w-4 h-4" />
                <img src="/icons/bullet_point_white.svg" alt="bullet_point_white" className="w-1 h-1" />
                <span className="text-white text-sm flex items-center">Created 3 days ago</span>
            </span>
            <Button
              className={cn(
                "hover:bg-white/25",
                "px-3 py-2 rounded-full"
              )}
            >
              <img src="/icons/delete_white.svg" alt="delete_white" className="w-5 h-5" />
            </Button>
          </div>

          <div className=" px-2 flex justify-between items-center gap-4">
            <p className="text-white text-ellipsis text-m flex items-center gap-4">
                {link}
                <img src="/icons/copy_icon.svg" alt="copy_icon" className="w-4 h-4" />
            </p>

            <div className="py-2 flex justify-center items-center gap-4">
              <Button
                className={cn(
                  "border-2 border-gray-300 text-blue-800 bg-white",
                  "hover:bg-gray-100",
                  "px-4 py-2 rounded-xl font-medium"
                )}
              >
                <img src="/icons/edit_blue_icon.svg" alt="edit_blue_icon" className="w-4 h-4" />
                  Edit
              </Button>
              <Button
                className={cn(
                  "border-2 border-gray-300 text-blue-800 bg-white",
                  "hover:bg-gray-100",
                  "px-4 py-2 rounded-xl font-medium"
                )}
                  onClick={() => setShowEmailModal(true)}
              >
                <img src="/icons/email_blue.svg" alt="email_blue" className="w-4 h-4" />
                Send email
              </Button>
            </div>
          </div>
        </div>
        {/* Email Modal */}
        {showEmailModal && (
          <SendEmail setShowEmailModal={setShowEmailModal} link={link} />
        )}
      </div>
    );
  }

export default LinkHistory;
