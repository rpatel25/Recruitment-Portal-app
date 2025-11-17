import React, { useState } from "react";
import {
  formatDateToLocale,
  formatDuration,
  formatTime,
} from "@/util/handleDateTime";
import { Button, cn } from "@heroui/react";
import { IConversation, MenuItem } from "@/types/chat.type";
import { v4 as uuidv4 } from "uuid";
import { MeetingTranscript } from "./MeetingTranscript";
import { useCreateTranscriptMutation } from "@/store/services/ApiRequest";

interface IProps {
  conversations: IConversation[];
}

const menuData: MenuItem[] = [
  {
    id: 0,
    label: "Delete",
    icon: "/icons/delete_red.svg",
  },
  {
    id: 1,
    label: "Edit",
    icon: "/icons/edit.svg",
  },
];

export const MeetingSummaryCard = ({ conversations }: IProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [currentConversation, setCurrentConversation] =
    useState<IConversation>();
  const [sessionid, setSessionid] = useState<string>(uuidv4());

  const [createTranscript] = useCreateTranscriptMutation();

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptions = (id: number) => {
    console.log(id);
    toggleDropdown();
  };

  const handleCopySummary = (summary: string, index: number) => {
    // Copy the summary text to clipboard
    navigator.clipboard.writeText(summary);
    setCopiedIndex(index);

    // Reset the button after 5 seconds
    setTimeout(() => {
      setCopiedIndex(null);
    }, 5000);
  };

  const handleTranscript = async (conversation: IConversation) => {
    await createTranscript({
      session_id: sessionid,
      transcript: conversation.transcript[0],
    });
    setShowTranscript(true);
    setCurrentConversation(conversation);
  };

  return (
    <div className="flex flex-col overflow-y-auto gap-4 p-4 h-full w-full">
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className="flex p-4 items-start gap-2.5 rounded-xl border border-[#C0C0C0] bg-white"
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[1px]">
                <h5 className="text-black text-base font-medium">
                  {conversation.title ?? "No Title"}
                </h5>
                <span className="text-[#706F6E] text-xs">
                  {formatDateToLocale(conversation.created_at)} •{" "}
                  {formatTime(conversation.created_at)} •{" "}
                  {formatDuration(conversation.duration)}
                </span>
              </div>

              {/* Ellipsis Icon */}
              <Button isIconOnly onPress={() => toggleDropdown()}>
                <img
                  src="/icons/luca_menu.svg"
                  alt="luca_menu"
                  className="w-6 h-6"
                />
              </Button>
            </div>

            <p className="text-[#706F6E] text-sm font-medium">
              {conversation.summary}
            </p>

            <Button
              variant="solid"
              onPress={() => handleCopySummary(conversation.summary[0], index)}
              startContent={
                copiedIndex === index ? (
                  <img
                    src="/icons/summary_copied.svg"
                    alt="summary_copied"
                    className="w-5 h-5"
                  />
                ) : null
              }
              className={cn(
                "p-4 w-fit h-9",
                "transition-all duration-300",
                "rounded-lg shadow-[0px_0px_6px_0px_rgba(0,0,0,0.20)]",
                "text-sm font-medium",
                copiedIndex === index
                  ? "bg-white text-[#323130] border border-solid border-[#C0C0C0]"
                  : "bg-[#3B4CBF] text-white"
              )}
            >
              {copiedIndex === index ? "Summary Copied" : "Copy summary"}
            </Button>

            <div className="flex items-center gap-5">
              <img src="/icons/download.svg" alt="download" />

              <Button isIconOnly onPress={() => handleTranscript(conversation)}>
                <img
                  src="/icons/meeting_summary_share.svg"
                  alt="meeting_summary_share"
                />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className={cn(
            "absolute right-12 top-28 p-[8px_1px]",
            "flex flex-col z-10",
            "rounded-[6px] border border-[#C0C0C0] bg-[#FFF] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.06)]"
          )}
        >
          {menuData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-[8px_16px] hover:bg-[var(--Primary-200,#EBEDF9)] cursor-pointer"
              onClick={() => handleDropdownOptions(item.id)}
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <span
                className={cn(
                  "text-sm",
                  item.id === 0 ? "text-[#D94439]" : "text-[#323130]"
                )}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {showTranscript && currentConversation && (
        <MeetingTranscript
          conversation={currentConversation}
          setShowTranscript={setShowTranscript}
          sessionid={sessionid}
          setSessionid={setSessionid}
        />
      )}
    </div>
  );
};
