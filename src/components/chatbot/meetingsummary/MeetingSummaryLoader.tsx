import React from "react";

export const MeetingSummaryLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="text-[#757575] text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};
