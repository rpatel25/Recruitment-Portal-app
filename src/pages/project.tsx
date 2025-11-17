import React, { useState, useEffect } from "react";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import { CreateProject } from "@/components/project/CreateProject";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProjectsHome } from "@/components/project/ProjectsHome";
import { useAuth } from "@/hooks/useAuth";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { cn } from "@heroui/react";

export default function ProjectPage() {
  const router = useRouter();
  const [isCreationActive, setIsCreationActive] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currentProjectId, setCurrentProjectId] = useState<string>("");
  const [showMeetingSummary, setShowMeetingSummary] = useState<boolean>(false);
  const [showChatHistory, setShowChatHistory] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Handle URL query parameters
  useEffect(() => {
    if (router.isReady) {
      const { create, id } = router.query;

      if (create === "true") {
        setIsCreationActive(true);
        setShowDetails(false);
      } else if (id && typeof id === "string") {
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
    <Provider store={store}>
      <div className="flex flex-col min-h-screen max-h-screen">
        <Header
          signout={handleSignOut}
          mail={userName ?? ""}
          credit={credit ?? 0}
          setHistoryTab={setHistoryTab}
          resetChat={resetChat}
          showMeetingSummary={showMeetingSummary}
          setShowMeetingSummary={setShowMeetingSummary}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          showChatHistory={showChatHistory}
          setShowChatHistory={setShowChatHistory}
        />

        <div
          // className="p-10 flex items-start gap-6 grow"
          className="flex grow"
          style={{ background: "#F0F6FF", minHeight: "90vh" }}
        >
          <div className="grid grid-cols-4 p-5 gap-20 grow ">
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
                "content col-span-3 bg-white rounded-2xl p-3 w-full border border-solid border-[#DDDFE3]"
              )}
            >
              {isCreationActive ? (
                <CreateProject setIsCreationActive={setIsCreationActive} />
              ) : showDetails ? (
                <ProjectDetails currentProjectId={currentProjectId} />
              ) : (
                <ProjectsHome
                  setIsCreationActive={setIsCreationActive}
                  setShowDetails={setShowDetails}
                  setCurrentProjectId={setCurrentProjectId}
                />
              )}
            </div>
          </div>
          {/* {isCreationActive ? (
            <CreateProject setIsCreationActive={setIsCreationActive} />
          ) : showDetails ? (
            <ProjectDetails currentProjectId={currentProjectId} />
          ) : (
            <ProjectsHome
              setIsCreationActive={setIsCreationActive}
              setShowDetails={setShowDetails}
              setCurrentProjectId={setCurrentProjectId}
            />
          )} */}
        </div>
      </div>
    </Provider>
  );
}
