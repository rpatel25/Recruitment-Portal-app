import React from "react";
import Link from "next/link";
import { cn } from "@heroui/theme";
import { classNames } from "@/util/classNames";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import ProjectsDropdown from "./ProjectsDropdown";
import { Button } from "@heroui/react";

type HeaderProps = {
  signout: () => void;
  mail: string;
  credit: number;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  showCalendar: boolean;
  showProfile: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  resetChat: () => void;
  showMeetingSummary: boolean;
  setShowMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChatHistory: React.Dispatch<React.SetStateAction<boolean>>;
  showChatHistory: boolean;
};

export default function Header({
  signout,
  mail,
  credit,
  setHistoryTab,
  resetChat,
  showMeetingSummary,
  setShowMeetingSummary,
  showCalendar,
  showProfile,
  setShowCalendar,
  setShowProfile,
  showChatHistory,
  setShowChatHistory,
}: HeaderProps) {
  return (
    <header
      className={cn(
        classNames.flexBetween,
        "xl:px-10 2xl:px-5",
        "bg-white w-full"
      )}
    >
      <div className={cn(classNames.simpleFlex, "gap-16")}>
        <div className="flex items-center gap-2">
          <img src="/icons/logo_symbol.svg" className="w-9 h-9" />
          <img src="/icons/logo.svg" className="w-48 h-7" />
        </div>

        <nav className={cn(classNames.simpleFlex, classNames.baseText)}>
          <Link href="/">
            <img
              src="/icons/header_home_icon_gradient.svg"
              alt="logo"
              className="min-w-6 min-h-6"
              onClick={() => {
                if (setHistoryTab) setHistoryTab(0);
                if (resetChat) resetChat();
                if (showChatHistory) setShowChatHistory(false);
                if (showCalendar) setShowCalendar(false);
                if (showProfile) setShowProfile(false);
              }}
            />
          </Link>
          <ProjectsDropdown>
            {({ onClick }) => (
              <Link
                href="#"
                className={classNames.labelText}
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}
              >
                Projects
              </Link>
            )}
          </ProjectsDropdown>
          <Link href="/competitor_analysis" className={classNames.labelText}>
            Competitor Analysis
          </Link>
          <Link href="/market_insights" className={classNames.labelText}>
            Market Insights
          </Link>
          <Link href="/assessment" className={classNames.labelText}>
            Assessment
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          onPress={() => setShowMeetingSummary(!showMeetingSummary)}
        >
          <img src="/icons/meeting_summary_icon.svg" alt="meeting_icon" />
        </Button>

        <Button isIconOnly onPress={() => setShowCalendar((prev) => !prev)}>
          <img src="/icons/calendar_in_header.svg" />
        </Button>

        <HeaderProfileDropdown
          mail={mail}
          credits={credit}
          signOut={signout}
          setShowProfile={setShowProfile}
        />
      </div>
    </header>
  );
}
