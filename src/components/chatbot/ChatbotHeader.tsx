import { Button, cn } from '@heroui/react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChatbotHeaderProps {
  setHistoryTab: (id: number) => void;
  setExpandChatbot: React.Dispatch<React.SetStateAction<boolean>>;
  isChatbotExpanded: boolean;
  setSessionid: React.Dispatch<React.SetStateAction<string>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
  showMeetingSummary: boolean;
  setShowMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setChatSession: React.Dispatch<React.SetStateAction<string>>;
  isChatAvailable: boolean;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  setExpandChatbot,
  setSessionid,
  isChatbotExpanded,
  setShowChatHistory,
  setChatSession,
}) => {
  return (
    <div className=" flex items-center justify-between w-full">
      <Button
        variant="solid"
        className={cn(
          'bg-[linear-gradient(53deg,#FF8C3F_27.79%,#864CEF_79.83%)] rounded-lg',
          ' p-1.5 text-white text-sm'
        )}
        startContent={
          <img
            src="/icons/luca_chat_logo.svg"
            alt="luca_chat_logo"
            className="w-7 h-7"
          />
        }
        endContent={
          <img
            src="/icons/right_arrow_white.svg"
            alt="right_arrow_white"
            className="w-4 h-4"
          />
        }
        onPress={() => setShowChatHistory(true)}
      >
        Luca
      </Button>

      {!isChatbotExpanded ? (
        <div className="flex items-center gap-2">
          <Button
            variant="solid"
            className={cn(
              'bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-lg',
              'p-4 text-white text-sm'
            )}
            startContent={
              <img src="/icons/newchat_icon.svg" className="w-5 h-5" />
            }
            onPress={() => {
              const newSession = uuidv4();
              setSessionid(newSession);

              setChatSession(newSession);
            }}
          >
            New Chat
          </Button>

          <Button
            isIconOnly
            variant="solid"
            className="bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-lg"
            onPress={() => setExpandChatbot(true)}
          >
            <img src="/icons/chat_expand_icon.svg" alt="expand_icon" />
          </Button>
        </div>
      ) : (
        <Button
          isIconOnly
          className="bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-md size-[25px]"
          onPress={() => setExpandChatbot(false)}
        >
          <img src="/icons/close_button_icon.svg" alt="expand" />
        </Button>
      )}
    </div>
  );
};

export default ChatbotHeader;
