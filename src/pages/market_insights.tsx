import React, { useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { AnalyzerChatbot } from '@/components/AnalyzerChatbot';

export default function MarketInsightsPage() {
  const [showMeetingSummary, setShowMeetingSummary] = useState<boolean>(false);

  const {
    userName,
    handleSignOut,
    sessionid,
    setSessionid,
    setHistoryTab,
    refreshKey,
    setRefreshKey,
    credit,
    setCandidateCount,
    resetChat,
  } = useAuth();

  return (
    <Provider store={store}>
      <div className="">
        <Header
          signout={handleSignOut}
          mail={userName ?? ''}
          credit={credit ?? 0}
          setHistoryTab={setHistoryTab}
          resetChat={resetChat}
          showMeetingSummary={showMeetingSummary}
          setShowMeetingSummary={setShowMeetingSummary}
          setShowCalendar={() => {}}
          showCalendar={false}
          setShowChatHistory={() => {}}
          showChatHistory={false}
        />

        <div
          className="p-6 flex items-start gap-6"
          style={{
            background: '#F0F6FF',
          }}
        >
          <div className="content grow bg-[#fff] rounded-2xl p-4 h-full 2xl:min-w-[72vw]">
            <AnalyzerChatbot
              username={userName}
              setHistoryTab={setHistoryTab}
              sessionid={sessionid}
              setSessionid={setSessionid}
              resetChat={resetChat}
              setShowChatHistory={() => {}}
              showChatHistory={false}
              refreshKey={refreshKey}
              setRefreshKey={setRefreshKey}
              setCandidateCount={setCandidateCount}
              analyzerType={'market_insights'}
            />
          </div>
        </div>
      </div>
    </Provider>
  );
}
