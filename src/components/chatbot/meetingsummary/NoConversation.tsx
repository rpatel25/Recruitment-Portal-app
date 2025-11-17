import React from "react";

export const NoConversation = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <img src="./icons/meeting_info.svg" alt="meeting_info" />
      <p className="text-[#9E9E9E] text-base font-medium">
        No conversations found
      </p>
      <p className="text-[#BDBDBD] text-sm text-center max-w-[280px]">
        Your meeting conversations will appear here once they are available
      </p>
    </div>
  );
};
