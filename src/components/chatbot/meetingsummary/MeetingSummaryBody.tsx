import React from "react";
import { MeetingSummaryLoader } from "./MeetingSummaryLoader";
import { MeetingSummaryCard } from "./MeetingSummaryCard";
import { NoConversation } from "./NoConversation";
import { IConversation } from "@/types/chat.type";

interface IProps {
  isLoading: boolean;
  conversations: IConversation[];
}

export const MeetingSummaryBody = ({ isLoading, conversations }: IProps) => {
  if (isLoading) {
    return <MeetingSummaryLoader />;
  }

  return (
    <>
      {conversations.length > 0 ? (
        <MeetingSummaryCard conversations={conversations} />
      ) : (
        <NoConversation />
      )}
    </>
  );
};
