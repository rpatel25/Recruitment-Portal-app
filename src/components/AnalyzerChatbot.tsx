import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useChatbot } from '@/hooks/useChatbot';
import { cn } from '@heroui/theme';
import { MessageDate } from './custom/CustomMessageDate';
import { UserMessage } from './custom/UserMessage';
import { LucaMessage } from './custom/LucaMessage';
import AnalyzerChatbotInput from './AnalyzerChatbotInput';
import { ChatMessage } from '@/types/chat.type';
import { Button } from '@heroui/react';

interface IProps {
  username: string | null;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  sessionid: string;
  setSessionid: React.Dispatch<React.SetStateAction<string>>;
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  resetChat: () => void;
  setCandidateCount: React.Dispatch<React.SetStateAction<number>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
  showChatHistory: boolean;
  analyzerType: string;
}

export const AnalyzerChatbot = ({
  setHistoryTab,
  sessionid = '',
  setSessionid,
  resetChat,
  showChatHistory,
  setShowChatHistory,
  analyzerType,
}: IProps) => {
  const [chatSession, setChatSession] = useState<string>('');
  const router = useRouter();
  const { dots, loading, handleAnalyzerInput, chat, setChat } = useChatbot(
    sessionid,
    setSessionid,
    chatSession,
    setChatSession
  );

  const message =
    analyzerType === 'competitor_analysis'
      ? 'Hello, I am Luca, your AI assistant to analyze the competitor. Please provide me the name of the competitor you want to analyze.'
      : 'Hello, I am Luca, your AI assistant to analyze the talent pool. Please provide me the job title,locations you want to analyze.';
  const firstMessage: ChatMessage = {
    time: new Date().toLocaleTimeString(),
    date: new Date(),
    message: message,
    type: 'luca',
  };
  useEffect(() => {
    setChat([firstMessage]);
  }, []);

  return (
    <div className="col-span-1">
      <div className="flex flex-row h-full gap-0">
        <div className="flex w-full h-full items-start flex-shrink-0">
          <div
            className={cn(
              'w-full h-[80vh] p-4',
              'flex flex-col items-start gap-2.5',
              'rounded-[16px] border border-gray-200 bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.08)]'
            )}
          >
            <Button
              isIconOnly
              className="bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-md place-self-end size-[25px]"
              onPress={() => {
                if (setHistoryTab) setHistoryTab(0);
                if (resetChat) resetChat();
                if (showChatHistory) setShowChatHistory(false);
                router.push('/');
              }}
            >
              <img src="/icons/close_button_icon.svg" alt="expand" />
            </Button>
            {chat.length > 0 ? (
              <div
                className={cn(
                  'flex flex-col justify-end gap-10 flex-1',
                  'w-full px-2 max-h-[65vh]',
                  'rounded-lg bg-white overflow-y-auto'
                )}
              >
                <MessageDate date={new Date(chat[0].date)} />
                <div className="flex flex-col gap-[16px] overflow-y-auto">
                  {chat.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        entry.type === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {entry.type === 'user' ? (
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
            ) : null}

            <AnalyzerChatbotInput
              analyzerType={analyzerType}
              onAnalyzerInput={handleAnalyzerInput}
              session_id={sessionid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
