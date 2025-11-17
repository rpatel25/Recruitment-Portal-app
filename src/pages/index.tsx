import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import SearchComp from "@/components/Search/SearchComp";
import StaticsCardComp from "@/components/StaticsCardComp";
import HomeCard from "@/components/HomeCard";
import { useAuth } from "@/hooks/useAuth";
import { store } from "@/store/store";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import { useState } from "react";
import { Provider } from "react-redux";
import { MeetingConversations } from "@/components/chatbot/MeetingSummaries";
import { ChatHistoryList } from "@/components/chathistory/ChatHistoryList";
import { Button } from "@heroui/react";
import { HistoryChatbot } from "@/components/HistoryChatbot";
import { DemoBooking } from "@/components/DemoBooking";
import CustomCalendar from "@/components/custom/CustomCalendar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Profile } from "@/components/Profile";

export default function Home() {
  const {
    demoDone,
    userName,
    handleSignOut,
    sessionid,
    setSessionid,
    historyTab,
    setHistoryTab,
    refreshKey,
    setRefreshKey,
    credit,
    candidateCount,
    setCandidateCount,
    resetChat,
    isfetching,
  } = useAuth();

  const [showMeetingSummary, setShowMeetingSummary] = useState<boolean>(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");

  if (isfetching) {
    return <LoadingScreen />;
  }

  if (!demoDone) {
    return (
      <Provider store={store}>
        <DemoBooking
          userName={userName ?? ""}
          credit={credit ?? 0}
          handleSignOut={handleSignOut}
        />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <div className="">
        <Header
          signout={handleSignOut}
          mail={userName ?? ""}
          credit={credit ?? "0"}
          setHistoryTab={setHistoryTab}
          resetChat={resetChat}
          showMeetingSummary={showMeetingSummary}
          setShowMeetingSummary={setShowMeetingSummary}
          showCalendar={showCalendar}
          showProfile={showProfile}
          setShowCalendar={setShowCalendar}
          setShowProfile={setShowProfile}
          showChatHistory={showChatHistory}
          setShowChatHistory={setShowChatHistory}
        />

        <div
          className="p-5 flex items-start gap-5"
          style={{ background: "#F0F6FF", minHeight: "90vh" }}
        >
          {showChatHistory ? (
            <ChatHistoryList setSelectedChatId={setSelectedChatId} />
          ) : (
            <Chatbot
              key={sessionid}
              username={userName}
              setHistoryTab={setHistoryTab}
              sessionid={sessionid}
              setSessionid={setSessionid}
              refreshKey={refreshKey}
              setRefreshKey={setRefreshKey}
              showMeetingSummary={showMeetingSummary}
              setShowMeetingSummary={setShowMeetingSummary}
              setShowChatHistory={setShowChatHistory}
              setCandidateCount={setCandidateCount}
              candidateCount={candidateCount}
            />
          )}

          {showChatHistory ? (
            <div className="content grow bg-[#fff] rounded-2xl p-4 h-full 2xl:min-w-[72vw]">
              <div className="flex flex-row-reverse items-center justify-between mb-4">
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={
                    <img
                      src="/icons/filter_close.svg"
                      alt="filter_close"
                      className="w-6 h-6"
                    />
                  }
                  onPress={() => {
                    setHistoryTab(0);
                    setShowChatHistory(false);
                  }}
                />
              </div>

              <HistoryChatbot
                key={sessionid}
                username={userName}
                setHistoryTab={setHistoryTab}
                sessionid={selectedChatId}
                setSessionid={setSessionid}
                refreshKey={refreshKey}
                setRefreshKey={setRefreshKey}
                setShowChatHistory={setShowChatHistory}
                setCandidateCount={setCandidateCount}
              />
            </div>
          ) : showCalendar ? (
            <CustomCalendar />
          ) : showProfile ? (
            <Profile />
          ) : (
            <div className="flex flex-col col-span-3 gap-6 grow">
              {showMeetingSummary && (
                <div className="absolute z-50">
                  <MeetingConversations
                    user={userName ?? ""}
                    setShowMeetingSummary={setShowMeetingSummary}
                    setShowChatHistory={setShowChatHistory}
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 w-full p-3 rounded-2xl border border-solid border-[#DDDFE3] bg-[#fff]">
                <div className="grow-0 grid grid-cols-3 gap-6">
                  <StaticsCardComp
                    key={historyTab + refreshKey}
                    sessionid={sessionid}
                    historyTab={historyTab}
                  />
                </div>

                <div className="w-full mx-auto my-0 bg-[#fff] rounded-2xl">
                  {(historyTab === 0 || historyTab === 1) && (
                    <HomeCard
                      key={historyTab}
                      tab={historyTab}
                      setSessionid={setSessionid}
                    />
                  )}

                  {historyTab == -1 && (
                    <SearchComp
                      key={historyTab + refreshKey}
                      sessionid={sessionid}
                      refreshKey={refreshKey}
                      setRefreshKey={setRefreshKey}
                      candidateCount={candidateCount}
                      setCandidateCount={setCandidateCount}
                      setHistoryTab={setHistoryTab}
                      resetChat={resetChat}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Provider>
  );
}
