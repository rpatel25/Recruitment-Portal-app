import { useChatbot } from "@/hooks/useChatbot";
import { cn } from "@heroui/theme";
import React, { useEffect, useRef, useState } from "react";
import { MessageDate } from "./custom/CustomMessageDate";
import { UserMessage } from "./custom/UserMessage";
import { LucaMessage } from "./custom/LucaMessage";
import ChatbotOptions from "./chatbot/ChatbotOptions";
import ChatbotInput from "./chatbot/ChatbotInput";
import { useGetSessionDetailsQuery } from "@/store/services/ApiRequest";
import ChatbotGreeting from "./chatbot/ChatbotGreeting";

interface IProps {
  username: string | null;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  sessionid: string;
  setSessionid: React.Dispatch<React.SetStateAction<string>>;
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
  setCandidateCount: React.Dispatch<React.SetStateAction<number>>;
}

export const HistoryChatbot = ({
  setHistoryTab,
  sessionid = "",
  setSessionid,
  refreshKey,
  setRefreshKey,
  setCandidateCount,
}: IProps) => {
  const [chatSession, setChatSession] = useState<string>("");
  const [, setIsChatBotExpanded] = useState<boolean>(false);
  const [chatType, setChatType] = useState<number>(0); // 0 for normal chat, 1 for internet based chat, -1 for GPT Researcher chat , 2 for Sourcing
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, refetch } = useGetSessionDetailsQuery(sessionid);
  const sessionDetails = data?.data ?? [];

  const {
    dots,
    handleUserInput,
    loading,
    openFilterDialog,
    saveSession,
    setOpenFilterDialog,
    setSaveSession,
    chat,
    setChat,
  } = useChatbot(sessionid, setSessionid, chatSession, setChatSession);

  useEffect(() => {
    if (sessionDetails.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    refetch();
  }, [chat]);

  if (!sessionid) {
    return (
      <div
        className={cn(
          "w-full min-h-[70vh]",
          "flex items-center justify-center"
        )}
      >
        <p className="text-[#323130] text-sm font-medium">
          Please select a chat to continue..
        </p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div
        className={cn(
          "w-full min-h-[70vh]",
          "flex items-center justify-center"
        )}
      >
        <p className="text-[#323130] text-sm font-medium">Loading..</p>
      </div>
    );
  }

  return (
    <div className="col-span-1">
      <div className="flex flex-row h-full gap-0">
        <div className="flex w-full h-full items-start flex-shrink-0">
          <div
            className={cn(
              "w-full max-h-[80vh] p-4",
              "flex flex-col items-start gap-2.5",
              "rounded-[16px] border border-gray-200 bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.08)]"
            )}
          >
            {sessionDetails.length > 0 ? (
              <div
                className={cn(
                  "flex flex-col justify-end gap-10 flex-1",
                  "w-full px-2 max-h-[65vh]",
                  "rounded-lg bg-white overflow-y-auto"
                )}
              >
                <MessageDate date={new Date(sessionDetails[0].creeated_at)} />
                <div
                  ref={chatContainerRef}
                  className="flex flex-col gap-4 overflow-y-auto"
                >
                  {sessionDetails.map((entry, index) => (
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
                  <div ref={bottomRef} /> {/* always at bottom */}
                  {loading && (
                    <div className="flex items-start">
                      <LucaMessage
                        message={`Typing${dots}`}
                        isExpanded={true}
                      />
                    </div>
                  )}
                  <ChatbotOptions
                    refreshKey={refreshKey}
                    setRefreshKey={setRefreshKey}
                    setSessionid={setSessionid}
                    sessionId={chatSession}
                    saveSession={saveSession}
                    setSaveSession={setSaveSession}
                    chatSession={chatSession}
                    openFilterDialog={openFilterDialog}
                    setOpenFilterDialog={setOpenFilterDialog}
                    setHistoryTab={setHistoryTab}
                    setCandidateCount={setCandidateCount}
                  />
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "w-full h-full overflow-y-auto overflow-x-hidden px-2",
                  "flex flex-col justify-center items-center",
                  "rounded-lg bg-white"
                )}
              >
                <ChatbotGreeting username={""} />
              </div>
            )}

            <ChatbotInput
              onUserInput={handleUserInput}
              setChatType={setChatType}
              chatType={chatType}
              setExpandChatbot={setIsChatBotExpanded}
              username=""
              setChat={setChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
