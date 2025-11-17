import React, { useEffect, useState } from 'react';
import Chatbot from '@/components/Chatbot';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@heroui/theme';
import { useRouter } from 'next/router';
import AssessmentDetails from '@/components/Assessment/AssessmentDetails';

export default function Assessment() {
  const router = useRouter();
  const [, setIsCreationActive] = useState<boolean>(false);
  const [, setShowDetails] = useState<boolean>(false);
  const [, setCurrentProjectId] = useState<string>('');
  const [showChatHistory, setShowChatHistory] = useState<boolean>(false);
  const [showMeetingSummary, setShowMeetingSummary] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const { create, id, assessment_id } = router.query;

      if (create === 'true') {
        setIsCreationActive(true);
        setShowDetails(false);
      } else if (id && typeof id === 'string') {
        setCurrentProjectId(id);
        setShowDetails(true);
        setIsCreationActive(false);
      } else {
        setIsCreationActive(false);
        setShowDetails(false);
      }
    }
  }, [router.isReady, router.query]);

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
    candidateCount,
    resetChat,
  } = useAuth();

  return (
    <>
      <Header
        signout={handleSignOut}
        mail={userName ?? ''}
        credit={credit ?? 0}
        setHistoryTab={setHistoryTab}
        resetChat={resetChat}
        showMeetingSummary={showMeetingSummary}
        setShowMeetingSummary={setShowMeetingSummary}
        setShowCalendar={setShowCalendar}
        showCalendar={showCalendar}
        showProfile={false}
        setShowProfile={() => {}}
        showChatHistory={showChatHistory}
        setShowChatHistory={setShowChatHistory}
      />

      <div
        className="p-5 flex items-start gap-6"
        style={{
          background: '#F0F6FF',
        }}
      >
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

        <div
          className={cn(
            'w-full h-[85vh] px-5',
            'bg-white shadow-md text-black',
            'rounded-2xl border border-gray-200'
          )}
        >
          <div className="mt-6">
            <AssessmentDetails
              assessment_id={router.query.assessment_id as string}
            />
          </div>
        </div>
      </div>
    </>
  );
}
