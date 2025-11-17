import React, { useState } from "react";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import { InputText } from "primereact/inputtext";

export const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <div
      className={cn(
        "w-full bg-[linear-gradient(87deg,#0F0338_0%,#2A0B7E_58.04%,#A782F9_116.07%)]",
        "rounded-2xl p-4 mb-4"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white text-xl font-semibold">Password</h3>
          <h6 className="text-white text-sm">Modify your current password</h6>
        </div>

        <Button
          variant="solid"
          className={cn(
            "bg-white rounded-lg px-1.5 py-3",
            "text-[#483FC5] text-sm font-medium"
          )}
          startContent={<img src="/icons/save_icon_blue.svg" alt="edit" />}
        >
          Save
        </Button>
      </div>

      <div className="w-full h-[1px] bg-[#ffffff66] mb-4" />

      <div className="w-full flex items-center justify-between gap-4">
        <div>
          <label className="block text-white text-base font-medium mb-1">
            Old Password
          </label>
          <InputText
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            style={{
              width: "297px",
              // height: "36px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 12,
            }}
          />
        </div>

        <div>
          <label className="block text-white text-base font-medium mb-1">
            New Password
          </label>
          <InputText
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            style={{
              width: "297px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 12,
            }}
          />
        </div>

        <div>
          <label className="block text-white text-base font-medium mb-1">
            Confirm Password
          </label>
          <InputText
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            style={{
              width: "297px",
              borderRadius: 8,
              border: "1px solid rgba(59,76,191,0.50)",
              padding: 12,
            }}
          />
        </div>
      </div>
    </div>
  );
};
