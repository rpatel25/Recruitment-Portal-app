import { useChatbot } from "@/hooks/useChatbot";
import { IConversation } from "@/types/chat.type";
import { classNames } from "@/util/classNames";
import {
  formatDateToLocale,
  formatDuration,
  formatTime,
} from "@/util/handleDateTime";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import React, { useState } from "react";
import ChatbotFilter from "../ChatbotFilters";
import { MessageDate } from "@/components/custom/CustomMessageDate";
import { UserMessage } from "@/components/custom/UserMessage";
import { LucaMessage } from "@/components/custom/LucaMessage";
import ChatbotGreeting from "../ChatbotGreeting";
import ChatbotInput from "../ChatbotInput";

interface IProps {
  conversation: IConversation;
  sessionid: string;
  setSessionid: React.Dispatch<React.SetStateAction<string>>;
  setShowTranscript: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeetingTranscript = ({
  conversation,
  sessionid,
  setSessionid,
  setShowTranscript,
}: IProps) => {
  const [chatSession, setChatSession] = useState<string>("");
  const [, setIsChatBotExpanded] = useState<boolean>(false);

  const { chat, dots, filter, handleUserInput, loading, setFilter, setChat } =
    useChatbot(sessionid, setSessionid, chatSession, setChatSession);

  const [chatType, setChatType] = useState<number>(0); // 0 for normal chat, 1 for internet based chat, -1 for GPT Researcher chat , 2 for Sourcing

  return (
    <div className="col-span-1">
      <div className="w-[90vw] h-[80vh] top-20 left-20 fixed z-50">
        <div className="flex w-full h-full items-start flex-shrink-0">
          <div
            className={cn(
              "w-full h-full p-4",
              "grid grid-cols-[1fr_3fr] gap-[5px]",
              "rounded-2xl border border-gray-200 bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.08)]"
            )}
          >
            <div
              className={cn(
                classNames.flexCenter,
                "flex-col gap-8",
                "bg-white border-r-[#C0C0C0)] border-r border-solid"
              )}
            >
              <img src="/icons/transcript_icon.svg" alt="transcript_icon" />
              <h4 className="text-[#327FFF] text-center text-xl font-medium">
                How can I help you with this conversation?
              </h4>
            </div>
            <div className="">
              <div
                className={cn(
                  "w-full h-16 px-4",
                  "flex items-center justify-between",
                  "border-b-[#C0C0C0] border-b border-solid"
                )}
              >
                <div className="flex items-center gap-2">
                  <h4 className="text-black text-sm font-semibold">
                    {conversation.title}
                  </h4>

                  <div
                    className={cn(
                      "bg-[linear-gradient(53deg,#483FC5_27.79%,#864CEF_79.83%)] rounded-full",
                      "flex justify-center items-center gap-2.5 px-2 py-px"
                    )}
                  >
                    <span className="text-white text-xs font-medium">
                      {formatDateToLocale(conversation.created_at)} •{" "}
                      {formatTime(conversation.created_at)} •{" "}
                      {formatDuration(conversation.duration)}
                    </span>
                  </div>
                </div>

                <Button
                  className={cn(
                    "bg-white px-4",
                    "border border-solid border-[#C0C0C0] rounded-lg",
                    "text-[#323130] text-xs font-medium"
                  )}
                  startContent={
                    <img
                      src="/icons/filter_close.svg"
                      alt="close"
                      className="w-4 h-4"
                    />
                  }
                  onPress={() => setShowTranscript(false)}
                >
                  Close
                </Button>
              </div>

              <div className="h-[55vh]">
                {filter ? (
                  <ChatbotFilter onFilterClose={setFilter} />
                ) : chat.length > 0 ? (
                  <div
                    className={cn(
                      "flex flex-col justify-end gap-10 flex-1",
                      "w-full px-2 h-[55vh]",
                      "rounded-lg bg-white overflow-y-auto"
                    )}
                  >
                    <MessageDate date={chat[0].date} />
                    <div className="flex flex-col gap-[16px] overflow-y-auto">
                      {chat.map((entry, index) => (
                        <div
                          key={index}
                          className={`flex flex-col ${
                            entry.type === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          {entry.type === "user" ? (
                            <UserMessage
                              message={entry.message}
                              isExpanded={true}
                            />
                          ) : (
                            <LucaMessage
                              message={entry.message}
                              isExpanded={true}
                            />
                          )}
                        </div>
                      ))}
                      {loading && (
                        <div className="flex items-start">
                          <LucaMessage
                            message={`Typing${dots}`}
                            isExpanded={true}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-10 flex-1 w-full rounded-lg bg-white h-full overflow-y-auto overflow-x-hidden px-2">
                    <ChatbotGreeting username={conversation.user_id} />
                  </div>
                )}

                <ChatbotInput
                  onUserInput={handleUserInput}
                  setChatType={setChatType}
                  chatType={chatType}
                  setExpandChatbot={setIsChatBotExpanded}
                  setChat={setChat}
                  username={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
