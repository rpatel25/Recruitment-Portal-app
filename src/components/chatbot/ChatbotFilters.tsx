import React, { useState } from "react";
import ChatbotFilterExpand from "@/components/chatbot/ChatbotFilterExpand";
import { cn } from "@heroui/theme";

interface FilterOption {
  title: string;
  options: string[]; // Adjust type based on the actual structure of `options`
}

interface ChatbotFilterProps {
  onFilterClose: (isOpen: boolean) => void;
}

const ChatbotFilter: React.FC<ChatbotFilterProps> = ({ onFilterClose }) => {
  const [filterData] = useState<FilterOption[]>([]);
  const [isLoading] = useState(false);

  // useEffect(() => {
  //   const fetchFilters = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await getFilters();
  //       // console.log(response);
  //       setFilterData(response.data) // Assuming API response has `data` with the required structure
  //     } catch (error) {
  //       console.error("Failed to fetch filters:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchFilters();
  // }, []);

  return (
    <div className="flex flex-col items-start gap-4 pt-4 flex-1 self-stretch">
      <div className="flex flex-row items-center justify-between self-stretch">
        <span className="flex text-xl font-medium text-[#323130]">Filter</span>
        <div className="flex flex-row items-center gap-2">
          <button
            className={cn(
              "h-9 px-2",
              "flex items-center justify-center gap-2",
              "rounded-md border-none border-[#3B4CBF]",
              "text-[#3B4CBF] text-center text-sm font-medium"
            )}
          >
            Clear all
          </button>
          <button
            className="flex h-9 px-2 justify-center items-center gap-2 rounded-md border-none border-gray-300"
            onClick={() => onFilterClose(false)}
          >
            <img src="/icons/filter_close.svg" alt="Close" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start flex-1 self-stretch border border-gray-200 rounded-lg p-4 overflow-y-auto max-h-[55vh]">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <span>Loading...</span>
          </div>
        ) : (
          filterData.map((component, index) => (
            <ChatbotFilterExpand
              key={index}
              title={component.title}
              options={component.options}
            />
          ))
        )}
      </div>
      <div
        className={cn(
          "w-full h-9 left-4 bottom-6 px-2",
          "flex items-center justify-center gap-2",
          "rounded-md border border-[#6776E0] bg-[#E6E9FF]"
        )}
        style={{ boxShadow: "0px_3px_6px_0px_rgba(0,0,0,0.1)" }}
      >
        <img
          src="icons/all_filter.svg"
          alt="Filter Icon"
          className="h-6 w-6 flex-shrink-0"
        />
        <span className="text-center text-sm font-medium text-[#3B4CBF]">
          All Filters
        </span>
      </div>
    </div>
  );
};

export default ChatbotFilter;
