import React, { useEffect, useRef, useState } from "react";
import { cn } from "@heroui/theme";
import { classNames } from "@/util/classNames";
import { capitalizeWords } from "@/util/handleTexts";
import { headerDropdownContent } from "@/util/data";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "@heroui/react";

interface HeaderProfileDropdownProps {
  mail: string;
  credits: number;
  signOut: () => void;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderProfileDropdown({
  mail,
  credits,
  signOut,
  setShowProfile,
}: HeaderProfileDropdownProps) {
  const [isprofileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
        className={cn(
          classNames.simpleFlex,
          "gap-1 p-1.5",
          "rounded-full bg-gradient-to-br from-[#FF8C3F] to-[#864CEF] cursor-pointer"
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className={cn(classNames.flexCenter, "w-7 h-7")}>
            <div
              className={cn(
                classNames.flexCenter,
                "w-7 h-7 flex-shrink-0 rounded-full bg-[#CAD1FF]"
              )}
            >
              <img
                src="/icons/luca_face.png"
                alt="luca_face"
                className="w-7 h-7 rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
        <img src="/icons/bottom_arrow.svg" alt="luca_face" />
      </div>

      {isprofileDropdownOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
            "w-[320px] p-4 absolute right-0 z-10",
            "flex flex-col items-start gap-2.5",
            "rounded-xl border border-gray-300 bg-[#FAF6FF]"
          )}
        >
          <div
            className={cn(
              "w-full bg-[#ffffff29] rounded-xl py-5",
              "flex flex-col items-center gap-2.5"
            )}
          >
            <img
              src="/icons/profile_picture.svg"
              className="w-11 h-11 rounded-full"
            />

            <h4 className="text-white text-base font-medium">
              {capitalizeWords(mail.split("@")[0])}
            </h4>
          </div>

          <div className="w-full">
            {headerDropdownContent.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "w-full py-2",
                  "flex justify-start items-center gap-2"
                )}
              >
                {item.id === "credits" ? null : (
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                )}

                {item.id === "credits" ? (
                  <div
                    className={cn(
                      "w-full p-2",
                      "border-y border-solid border-[#cbd5e180]",
                      "flex items-center justify-between"
                    )}
                  >
                    <div>
                      <h4 className="text-white text-base font-medium mb-2">
                        {credits}/2000 Credits left
                      </h4>

                      <ProgressBar
                        value={(credits / 2000) * 100}
                        showValue={false}
                        color="#ff8c3f"
                        style={{
                          height: "4px",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>

                    <Button
                      variant="bordered"
                      className={cn(
                        "bg-[#ffffff26] rounded-lg p-2",
                        "text-white text-xs font-medium"
                      )}
                      startContent={<img src="/icons/upgrade.svg" alt="" />}
                    >
                      Upgrade
                    </Button>
                  </div>
                ) : item.id === "visit_website" ? (
                  <a
                    href="https://lookoutai.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-white text-base font-medium hover:cursor-pointer">
                      {item.label}
                    </span>
                  </a>
                ) : item.id === "sign_out" ? (
                  <span
                    className="text-white text-base font-medium hover:cursor-pointer"
                    onClick={signOut}
                  >
                    {item.label}
                  </span>
                ) : item.id === "account_settings" ? (
                  <span
                    role="button"
                    className="text-white text-base font-medium cursor-pointer"
                    onClick={() => {
                      setShowProfile(true);
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <span className="text-white text-base font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
