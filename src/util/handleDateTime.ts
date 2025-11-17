/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export const formatDate = (date: Date) => {
  const currentDate = new Date();

  const sameDay = currentDate.toDateString() === date.toDateString();
  const yesterday =
    new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString() ===
    date.toDateString();

  if (sameDay) return "Today";
  if (yesterday) return "Yesterday";

  return moment(date).format("MMMM Do, YYYY");
};

// Function to calculate time difference
export const getTimeDifference = (createdAt: Date) => {
  const createdDate = new Date(createdAt); // Parse ISO timestamp
  const offset = createdDate.getTimezoneOffset(); // Offset in minutes
  const localDate = new Date(createdDate.getTime() - offset * 60000); // Adjusted to local time

  const diffMs = new Date().getTime() - localDate.getTime(); // Difference in milliseconds

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;

  return `${diffMinutes}m`;
};

// Function to calculate Date difference
export const getDateDifference = (date: string) => {
  return moment(Date.now()).diff(moment(date), "days");
};

export const formatDateInExperience = (date: string | null) => {
  if (!date) return "Present";

  const parsedDate = moment(date).format("LL");
  const dateArr = parsedDate.split(" ");
  dateArr.splice(1, 1);
  const formattedDate = dateArr.join(" ");

  return formattedDate;
};

export function formatDateToLocale(dateStr: any): string {
  const isoString =
    typeof dateStr === "string"
      ? dateStr
      : dateStr && typeof dateStr === "object" && "$date" in dateStr
      ? dateStr.$date
      : "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatTime(dateStr: any): string {
  const isoString =
    typeof dateStr === "string"
      ? dateStr
      : dateStr && typeof dateStr === "object" && "$date" in dateStr
      ? dateStr.$date
      : "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "Invalid Time";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDuration(durationStr: string): string {
  const [hoursStr, minsStr] = durationStr.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minsStr, 10);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(" ") : "0 mins";
}
