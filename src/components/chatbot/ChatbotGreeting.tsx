import { getUsernameFromEmail } from "@/util/getUserNameFromEmail";
import { greetingMessage } from "@/util/greetingMessage";
import { cn } from "@heroui/theme";
import React from "react";

interface ChatbotGreetingProps {
  username: string | null;
}

const ChatbotGreeting: React.FC<ChatbotGreetingProps> = ({ username }) => {
  const name = getUsernameFromEmail(username);

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <img
          src="icons/luca_greeting.png"
          alt="Placeholder"
          className="w-32 h-32 rounded-full"
        />

        <h1 className={cn("text-[#323130] text-center text-xl font-medium")}>
          {greetingMessage()}, {name}
        </h1>

        <p className="text-[#323130] text-center text-xl font-medium">
          How Can I <span className="text-[#327FFF]">Assist You Today?</span>
        </p>
      </div>
    </>
  );
};

export default ChatbotGreeting;
