import { cn } from "@heroui/theme";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface LucaComponentProps {
  message: string;
  isExpanded: boolean;
}

export const LucaMessage: React.FC<LucaComponentProps> = ({
  message,
  isExpanded,
}) => (
  <div
    className={cn(
      isExpanded ? "max-w-[844px]" : "max-w-[344px]",
      "w-fit p-[12px_16px]",
      "flex justify-center items-start gap-2",
      "rounded-[16px_16px_16px_0px] bg-[#F6F3FF]"
    )}
  >
    <img src="/icons/luca_face_msg.png" alt="LucaAI Header" />
    <p className={cn("text-gray-800", isExpanded ? "text-base" : "text-sm")}>
      {/* {message} */}
      {/* <ReactMarkdown>{message}</ReactMarkdown> */}
      <div className="prose max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {message}
        </ReactMarkdown>
      </div>
    </p>
  </div>
);
