import { classNames } from "@/util/classNames";
import { formatDate } from "@/util/handleDateTime";
import { cn } from "@heroui/theme";

interface MessageDateProps {
  date: Date;
}

export const MessageDate: React.FC<MessageDateProps> = ({ date }) => {
  return (
    <div
      className={cn(
        classNames.flexCenter,
        "w-fit mx-auto p-[2px_12px]",
        "gap-8 rounded-lg border border-[#D6D6D8] bg-[#F3F4F8]"
      )}
    >
      <p className="text-[#636363] text-xs font-medium tracking-[-0.2px]">
        {formatDate(date)}
      </p>
    </div>
  );
};
