import { IData } from "@/types/chat.type";
import { parseISO, isToday, isYesterday } from "date-fns";

export interface GroupedData {
  today: IData[];
  yesterday: IData[];
  previous30Days: IData[];
}

export function groupDataByDate(data: IData[]): GroupedData {
  const today: IData[] = [];
  const yesterday: IData[] = [];
  const previous30Days: IData[] = [];

  data.forEach((item) => {
    const createdDate = parseISO(item.created_at);

    if (isToday(createdDate)) {
      today.push(item);
    } else if (isYesterday(createdDate)) {
      yesterday.push(item);
    } else {
      previous30Days.push(item);
    }
  });

  return { today, yesterday, previous30Days };
}
