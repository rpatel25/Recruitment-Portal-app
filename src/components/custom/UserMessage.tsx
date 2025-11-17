import { cn } from "@heroui/theme";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface UserMessageProps {
  message: string;
  isExpanded: boolean;
}

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  isExpanded,
}) => (
  <div
    className={cn(
      isExpanded ? "max-w-[844px]" : "max-w-[344px]",
      "w-fit p-[12px_16px]",
      "flex justify-center items-center gap-8",
      "rounded-[16px_16px_0px_16px] bg-gradient-to-r from-[#6732D6] to-[#3B4CBF] backdrop-blur-[20px]"
    )}
  >
    <div
      className={cn(
        "prose max-w-none text-white whitespace-pre-wrap",
        isExpanded ? "text-base" : "text-sm"
      )}
    >
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message}</ReactMarkdown>
    </div>
    {/* <p className="text-white text-sm">{message}</p> */}
  </div>
);
