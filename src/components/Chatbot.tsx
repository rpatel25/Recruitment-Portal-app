import ChatbotFilter from "@/components/chatbot/ChatbotFilters";
import ChatbotGreeting from "@/components/chatbot/ChatbotGreeting";
import ChatbotHeader from "@/components/chatbot/ChatbotHeader";
import ChatbotInput from "@/components/chatbot/ChatbotInput";
import ChatbotOptions from "@/components/chatbot/ChatbotOptions";
import { cn } from "@heroui/theme";
import React, { useEffect, useRef, useState } from "react";
import { MessageDate } from "./custom/CustomMessageDate";
import { UserMessage } from "./custom/UserMessage";
import { LucaMessage } from "./custom/LucaMessage";
import { useChatbot } from "@/hooks/useChatbot";

interface ChatbotLayoutProps {
  username: string | null;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  sessionid: string;
  setSessionid: React.Dispatch<React.SetStateAction<string>>;
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  showMeetingSummary: boolean;
  setShowMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
  setCandidateCount: React.Dispatch<React.SetStateAction<number>>;
  candidateCount: number;
}

const Chatbot: React.FC<ChatbotLayoutProps> = ({
  username,
  setHistoryTab,
  sessionid = "",
  setSessionid,
  refreshKey,
  setRefreshKey,
  showMeetingSummary,
  setShowMeetingSummary,
  setShowChatHistory,
  setCandidateCount,
  candidateCount,
}) => {
  const [chatSession, setChatSession] = useState<string>("");

  const {
    chat,
    dots,
    filter,
    handleUserInput,
    loading,
    openFilterDialog,
    saveSession,
    setFilter,
    setOpenFilterDialog,
    setSaveSession,
    setChat,
  } = useChatbot(
    sessionid,
    setSessionid,
    chatSession,
    setChatSession,
    setHistoryTab,
    setCandidateCount,
    candidateCount
  );

  const [isChatbotExpanded, setIsChatBotExpanded] = useState<boolean>(false);
  const [chatType, setChatType] = useState<number>(0); // 0 for normal chat, 1 for internet based chat, -1 for GPT Researcher chat , 2 for Sourcing
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="col-span-1">
      <div
        className={cn(
          isChatbotExpanded
            ? "w-[90vw] h-[80vh] top-20 left-20 fixed z-50"
            : "min-w-[420px] h-[85vh] flex flex-row gap-0"
        )}
      >
        <div className="flex w-full h-full items-start flex-shrink-0">
          <div
            className={cn(
              "w-full h-full p-4",
              "flex flex-col items-start gap-2.5",
              "rounded-[16px] border border-gray-200 bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.08)]"
            )}
          >
            <ChatbotHeader
              setHistoryTab={setHistoryTab}
              setExpandChatbot={setIsChatBotExpanded}
              isChatbotExpanded={isChatbotExpanded}
              setSessionid={setSessionid}
              showMeetingSummary={showMeetingSummary}
              setShowMeetingSummary={setShowMeetingSummary}
              setShowChatHistory={setShowChatHistory}
              setChatSession={setChatSession}
              isChatAvailable={chat.length ? true : false}
            />

            {filter ? (
              <ChatbotFilter onFilterClose={setFilter} />
            ) : chat.length > 0 ? (
              <div
                className={cn(
                  "flex flex-col justify-end gap-10 flex-1",
                  "w-full px-2 max-h-[65vh]",
                  "rounded-lg bg-white overflow-y-auto"
                )}
              >
                <MessageDate date={chat[0].date} />
                <div
                  ref={chatContainerRef}
                  className="flex flex-col gap-4 overflow-y-auto"
                >
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
                          isExpanded={isChatbotExpanded}
                        />
                      ) : (
                        <LucaMessage
                          message={entry.message}
                          isExpanded={isChatbotExpanded}
                        />
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start">
                      <LucaMessage
                        message={`Typing${dots}`}
                        isExpanded={isChatbotExpanded}
                      />
                    </div>
                  )}
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
                <ChatbotGreeting username={username} />
              </div>
            )}

            {chat.length > 0 ? (
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
            ) : null}

            <ChatbotInput
              onUserInput={handleUserInput}
              setChatType={setChatType}
              chatType={chatType}
              setExpandChatbot={setIsChatBotExpanded}
              setChat={setChat}
              username={username}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
