import React, { useState } from "react";
import { useGetChatHistoryQuery } from "@/store/services/ApiRequest";
import { IData } from "@/types/chat.type";
import { groupDataByDate } from "@/util/groupByDate";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  setSelectedChatId: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatHistoryList = ({ setSelectedChatId }: IProps) => {
  const { data, isFetching } = useGetChatHistoryQuery();
  const chatHistory = data?.data;

  const grouped = groupDataByDate(chatHistory ?? []);

  const [selectedChat, setSelectedChat] = useState("");

  const onClickChat = (item: IData) => {
    setSelectedChat(item.id);
    setSelectedChatId(item.session_id);
  };

  const renderSection = (title: string, items: IData[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4">
        <h2 className="text-[#706F6E] text-xs font-semibold mb-2">{title}</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start",
              "p-2 mb-2 cursor-pointer",
              item.id === selectedChat ? "bg-[#3B4CBF] rounded-lg" : ""
            )}
            onClick={() => onClickChat(item)}
          >
            <img
              src={
                item.id === selectedChat
                  ? `/icons/chat_white.svg`
                  : item.type === "normal"
                  ? `/icons/chat.svg`
                  : `/icons/meeting_summary.svg`
              }
              alt="chat"
              className="mr-2"
            />
            <h4
              className={cn(
                item.id === selectedChat ? "text-white" : "text-[#323130]",
                "text-sm font-medium"
              )}
            >
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full min-h-[80vh] max-h-[85vh] overflow-y-scroll",
        "p-4",
        "flex flex-col items-start gap-2.5",
        "rounded-[16px] border border-gray-200 bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="w-full flex items-center justify-between border-b-2 border-b-[#C0C0C0] py-3">
        <h4 className="text-black text-base font-semibold">Search History</h4>

        <Button
          variant="solid"
          className={cn(
            "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-lg",
            "p-4 text-white text-sm"
          )}
          startContent={
            <img src="/icons/newchat_icon.svg" className="w-5 h-5" />
          }
          onPress={() => {
            const newSession = uuidv4();
            setSelectedChat(newSession);
            setSelectedChatId(newSession);
          }}
        >
          New Chat
        </Button>
      </div>

      {isFetching ? (
        <div className="w-full flex items-center justify-center">
          <h4 className="text-[#323130] text-sm font-medium">Loading..</h4>
        </div>
      ) : (
        <div className="w-full">
          {renderSection("Today", grouped.today)}
          {renderSection("Yesterday", grouped.yesterday)}
          {renderSection("Previous 30 Days", grouped.previous30Days)}
        </div>
      )}
    </div>
  );
};
