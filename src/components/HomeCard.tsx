import ChatHistoryCard from "@/components/ChatHistoryCard";
import Snackbar from "./Snackbar";
import LoadingScreen from "./Loading";
import { cn } from "@heroui/theme";
import { menus } from "@/util/data";
import { classNames } from "@/util/classNames";
import { useHomeCard } from "@/hooks/useHomeCard";

interface IProps {
  tab: number;
  setSessionid: (session_id: string) => void;
}

export default function HomeCard({ tab, setSessionid }: IProps) {
  const {
    allSelected,
    cardData,
    isLoading,
    menuSelect,
    onSort,
    selectedTab,
    setCardData,
    setSnackbar,
    snackbar,
  } = useHomeCard(tab);

  if (isLoading) {
    <div className={classNames.flexCenter}>
      <LoadingScreen />
    </div>;
  }

  return (
    <div
      className={cn(
        "w-full h-full p-4",
        "flex items-start gap-2",
        "rounded-2xl border border-gray-200 bg-white shadow-md text-black"
      )}
    >
      <div className="w-full h-full">
        {/* Project Tabs */}
        <div className="flex w-full h-9 items-start gap-6 border-b border-gray-200">
          {menus.map((menu, index) => {
            const isDisabled = index === 2 || index === 3;
            return (
              <div
                key={index}
                className={cn(
                  classNames.flexCenter,
                  "px-2 pb-3 flex-col gap-2",
                  "cursor-pointer relative",
                  "text-[#323130] text-center text-sm font-medium",
                  selectedTab === index
                    ? "border-b-[3px] border-b-[#3B4CBF] text-[#3B4CBF]"
                    : "",
                  isDisabled ? "pointer-events-none text-gray-400" : ""
                )}
                onClick={() => !isDisabled && menuSelect(index)}
              >
                {menu}
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className={cn(classNames.flexCenter, "w-full gap-6 mb-4 pt-4")}>
          <div className="flex items-center gap-2 flex-1">
            <button
              className={cn(
                "px-4 gap-2",
                "text-[#3B4CBF] text-center text-sm font-medium"
              )}
              onClick={() => {
                setCardData((prevData) =>
                  prevData.map((card) => ({ ...card, select: !allSelected }))
                );
              }}
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>

            <span className={cn("text-[#323130] text-lg tracking-[-0.5px]")}>
              Search Results ({cardData.length})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onSort()}>
              <img
                src="/icons/sort.svg"
                alt="undo"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className={cn(
            "w-full relative",
            "xl:max-h-[57vh] xl:min-h-[52vh]",
            "space-y-4",
            "overflow-y-auto overflow-x-hidden"
          )}
        >
          {cardData.map((card, index) => (
            <ChatHistoryCard
              key={index}
              skills={
                card.skills_and_keywords.length > 3
                  ? card.skills_and_keywords.slice(0, 3)
                  : card.skills_and_keywords
              }
              filter_count={card.filter_count}
              location={card.location?.place?.[0] ?? ""}
              query={card.last_message}
              time={card.time}
              select={card.select}
              session_id={card.session_id}
              total_candidates={card.total_candidates}
              chatbox_id={card.chatbox_id}
              setSessionid={setSessionid}
              saved={card.saved}
              cardData={cardData}
              setCardData={setCardData}
              onToggleSelect={() => {
                setCardData((prevData) =>
                  prevData.map((item, i) =>
                    i === index ? { ...item, select: !item.select } : item
                  )
                );
              }}
            />
          ))}
        </div>

        {snackbar["show"] && (
          <Snackbar
            message={snackbar["message"]}
            onClose={() => setSnackbar({ show: false, message: "" })}
          />
        )}
      </div>
    </div>
  );
}
