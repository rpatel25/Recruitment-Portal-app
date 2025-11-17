import { classNames } from "@/util/classNames";
import { cn } from "@heroui/theme";
import ThreeDotNewMenu from "./ThreeDotNew";
import { deleteSearchApi, saveSearchApiSingle } from "@/services/Chatbot";
import { CardData } from "@/util/Types";

interface ChatHistoryCardProps {
  time: string;
  skills: string[];
  filter_count: number;
  location: string;
  query: string;
  select: boolean;
  session_id: string;
  total_candidates: number;
  onToggleSelect: () => void;
  setSessionid: (session_id: string) => void;
  chatbox_id: string;
  saved: boolean;
  cardData: CardData[];
  setCardData: (card: CardData[]) => void;
}

export default function ChatHistoryCard({
  time,
  skills,
  filter_count,
  location,
  query,
  select,
  session_id,
  total_candidates,
  onToggleSelect,
  setSessionid,
  chatbox_id,
  saved,
  cardData,
  setCardData,
}: ChatHistoryCardProps) {
  const onClickModify = () => {
    console.log("Modify clicked");
    setSessionid(session_id);
  };

  const onClickSave = async () => {
    console.log("Save clicked");
    await saveSearchApiSingle(session_id, true);
  };

  const onClickUnsave = async () => {
    console.log("Unsave clicked");
    await saveSearchApiSingle(session_id, false);
    setCardData(cardData.filter((card) => card.chatbox_id !== chatbox_id));
  };

  const onClickDelete = async () => {
    console.log("Delete clicked");
    await deleteSearchApi([chatbox_id]);
    setCardData(cardData.filter((card) => card.chatbox_id !== chatbox_id));
  };

  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <div
        className={cn(
          "p-[15px] h-28",
          "flex items-center gap-4 self-stretch",
          "border border-gray-300 rounded-2xl",
          select ? "bg-[rgba(59,76,191,0.07)]" : ""
        )}
      >
        <div
          className={cn(
            "w-[45px] h-28",
            "inline-flex flex-shrink-0 items-center gap-2",
            "rounded-[16px_0_0_16px] border-r border-gray-300",
            "hover:cursor-pointer"
          )}
          onClick={onToggleSelect}
        >
          <img
            src={
              select ? "/icons/checkbox-selected.svg" : "/icons/checkbox.svg"
            }
            alt="checkbox"
            className="items-center"
          />
        </div>
        <div className={cn("w-full flex flex-col items-start gap-2")}>
          <div
            className={cn(
              "w-full h-5",
              classNames.flexBetween,
              "text-gray-300 text-center text-sm font-medium"
            )}
          >
            <div className={cn(classNames.simpleFlex, "gap-2")}>
              <img src="/icons/clock.svg" alt="clock" />
              <span>Searched {time} ago</span>
            </div>

            {/* <ThreeDotMenu onClickModify={onClickModify} /> */}
            {saved ? (
              <ThreeDotNewMenu
                onClickUnsave={onClickUnsave}
                onClickDelete={onClickDelete}
              />
            ) : (
              <ThreeDotNewMenu
                onClickSave={onClickSave}
                onClickDelete={onClickDelete}
              />
            )}
          </div>

          <div className={cn(classNames.flexCenter, "gap-2 text-center")}>
            <span
              className="text-[#323130] text-base font-normal hover:cursor-pointer"
              onClick={onClickModify}
            >
              {query ? query : "Candidate Search"}
            </span>

            <div
              className={cn(
                classNames.flexCenter,
                "gap-2 px-3 py-1 rounded-full bg-[#EBEDF9]",
                "text-[#3B4CBF] text-xs font-medium"
              )}
            >
              {filter_count ? filter_count : "12 +"} Filters
            </div>
          </div>

          <div className="flex items-start gap-[9px]">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={cn(
                  classNames.flexCenter,
                  "gap-2 h-8 py-1 px-3",
                  "rounded-2xl border border-gray-300 bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.06)]"
                )}
              >
                <img className="w-5 h-5" src="/icons/tag.svg" alt="Tag Icon" />
                <span className="text-[#323130] text-center text-sm font-medium">
                  {skill}
                </span>
              </div>
            ))}
            {location && (
              <div
                className={cn(
                  classNames.flexCenter,
                  "gap-2 h-8 py-1 px-3",
                  "rounded-2xl border border-gray-300 bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.06)]"
                )}
              >
                <img className="w-5 h-5" src="/icons/location.svg" />
                <span className="text-[#323130] text-center text-sm font-medium">
                  {location}
                </span>
              </div>
            )}
            <div
              className={cn(
                classNames.flexCenter,
                "gap-2 h-8 py-1 px-3",
                "rounded-2xl border border-gray-300",
                "bg-gradient-to-r from-[#6371D0] to-[#3B88BF] shadow-[0px_3px_6px_rgba(0,0,0,0.06)]"
              )}
            >
              <div className="w-5 h-5 rounded-full bg-[#CAD1FF]">
                <img src="/icons/luca_face.png" />
              </div>

              <span className="text-white text-center text-sm font-medium">
                {total_candidates
                  ? "Luca searched for " + total_candidates + " candidates"
                  : "No search results"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
