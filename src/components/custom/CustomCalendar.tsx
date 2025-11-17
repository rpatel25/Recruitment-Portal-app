/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
import { addDays, subDays } from "date-fns";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { cn } from "@heroui/theme";
import { useGetAllMeetingsQuery } from "@/store/services/ApiRequest";

const locales = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    title: "job hunting time",
    start: new Date(2025, 0, 6, 10, 0),
    end: new Date(2025, 0, 6, 12, 0),
    color: "#4F46E5",
  },
  // ...
];

export default function CustomCalendar() {
  const { data } = useGetAllMeetingsQuery();

  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [sidebarMonth, setSidebarMonth] = useState<Date>(new Date());
  const [search, setSearch] = useState("");

  const events = useMemo(() => {
    const raw = data ?? initialEvents;
    return (raw as any[]).map((e) => {
      const start =
        e.start instanceof Date
          ? e.start
          : e.start_time
          ? new Date(e.start_time)
          : e.start
          ? new Date(e.start)
          : new Date();
      const end =
        e.end instanceof Date
          ? e.end
          : e.end_time
          ? new Date(e.end_time)
          : e.end
          ? new Date(e.end)
          : start;
      return {
        ...e,
        start,
        end,
        color: e.color ?? "#4F46E5",
        title: e.title ?? "Untitled",
      };
    });
  }, [data]);

  const handleSidebarMonthChange = (newMonth: Date) => {
    setSidebarMonth(newMonth);
    setCalendarDate(newMonth);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f3f4f8] p-6">
      <div className="flex rounded-2xl overflow-hidden shadow-lg bg-white/80">
        <aside className="w-64 bg-[#F6F1FF] border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b-[#DFCDFF] border-b border-solid">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-black text-sm font-bold">
                {format(sidebarMonth, "MMMM yyyy")}
              </h5>
              <div className="flex items-center gap-2">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    handleSidebarMonthChange(subMonths(sidebarMonth, 1))
                  }
                >
                  &lt;
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    handleSidebarMonthChange(addMonths(sidebarMonth, 1))
                  }
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className="text-black text-[10px] font-bold">
                  {d}
                </div>
              ))}
              {(() => {
                const year = sidebarMonth.getFullYear();
                const month = sidebarMonth.getMonth();
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const daysInMonth = lastDay.getDate();
                const startDay = firstDay.getDay();
                const days = [];
                for (let i = 0; i < startDay; i++) {
                  days.push(<div key={"empty-" + i}></div>);
                }
                for (let i = 1; i <= daysInMonth; i++) {
                  days.push(
                    <div
                      key={i}
                      className={cn(
                        "py-1 rounded-full text-black text-[10px]",
                        i === new Date().getDate() &&
                          month === new Date().getMonth() &&
                          year === new Date().getFullYear()
                          ? "bg-[#864CEF] text-white font-bold"
                          : "hover:bg-gray-200"
                      )}
                    >
                      {i}
                    </div>
                  );
                }
                return days;
              })()}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-[2px] h-[36px]">
              <button
                className="px-[11px] py-2 bg-gray-100 text-gray-900 text-[12px] rounded-tl-lg rounded-bl-lg"
                onClick={() => {
                  const newDate = subDays(calendarDate, 1);
                  setCalendarDate(newDate);
                  setSidebarMonth(newDate);
                }}
              >
                &lt;
              </button>
              <button
                className="px-[11px] py-2 bg-gray-100 text-gray-900 text-[12px] "
                onClick={() => {
                  setCalendarDate(new Date());
                  setSidebarMonth(new Date());
                }}
              >
                Today
              </button>
              <button
                className="px-[11px] py-2 bg-gray-100 text-gray-900 text-[12px] rounded-tr-lg rounded-br-lg "
                onClick={() => {
                  const newDate = addDays(calendarDate, 1);
                  setCalendarDate(newDate);
                  setSidebarMonth(newDate);
                }}
              >
                &gt;
              </button>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                className={`px-4 py-1 rounded ${
                  view === "day"
                    ? "bg-[#864CEF] text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setView("day")}
              >
                Day
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  view === "week"
                    ? "bg-[#864CEF] text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setView("week")}
              >
                Week
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  view === "month"
                    ? "bg-[#864CEF] text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => setView("month")}
              >
                Month
              </button>
              {/* <button
                className={`px-4 py-1 rounded ${
                  view === "month" && "bg-white border border-gray-200"
                }`}
                onClick={() => {
                  setView("month");
                }}
              >
                Year
              </button> */}
            </div>

            <div className="ml-auto">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 rounded border border-gray-200 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <Calendar
              toolbar={false}
              localizer={localizer}
              events={events.filter((e) =>
                e.title.toLowerCase().includes(search.toLowerCase())
              )}
              startAccessor="start"
              endAccessor="end"
              view={view as any}
              onView={(v) => {
                setView(v as any);
              }}
              date={calendarDate}
              onNavigate={(date) => {
                setCalendarDate(date);
                setSidebarMonth(date);
              }}
              views={["month", "week", "day"]}
              style={{ height: 600 }}
              popup
              eventPropGetter={(event: any) => ({
                style: {
                  backgroundColor: event.color || "#4F46E5",
                  borderRadius: "8px",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  fontWeight: 500,
                  fontSize: 14,
                },
              })}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
