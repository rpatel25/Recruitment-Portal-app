"use client";

import React, { useEffect, useState } from "react";
import { getMeetingsConversations } from "@/services/MeetingSummary";
import { cn } from "@heroui/theme";
import { MeetingSummaryHeader } from "./meetingsummary/MeetingSummaryHeader";
import { IConversation } from "@/types/chat.type";
import { MeetingSummaryBody } from "./meetingsummary/MeetingSummaryBody";

interface IProps {
  user: string;
  setShowMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeetingConversations = ({
  user,
  setShowMeetingSummary,
}: IProps) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getMeetingsConversations(user);
        console.log(response);
        setConversations(response.transcripts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setIsLoading(false);
        setConversations([]);
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4",
        "w-[369px] h-[90vh] flex-shrink-0",
        "rounded-2xl border border-[#C0C0C0] bg-white"
      )}
    >
      <MeetingSummaryHeader setShowMeetingSummary={setShowMeetingSummary} />
      <MeetingSummaryBody conversations={conversations} isLoading={isLoading} />
    </div>
  );
};
