import { get_candidate_result } from "@/services/Candidate";
import {
  Candidate,
  InitialCandidate,
  transformCandidateData,
} from "@/types/Candidate";
import { useEffect, useState, useRef } from "react";
import CandidateLoadingScreen from "../CandidateLoading";
import { CandidateProfile } from "./CandidateProfile/index";
import { cn } from "@heroui/theme";
import { Dialog } from "primereact/dialog";
import { CreditConfirmation } from "../AdvancedFilters/CreditConfirmation";
import { Button } from "@heroui/react";
import { callPDL_refresh } from "@/services/Chatbot";
import { NoCreditsLeft } from "./NoCreditsLeft";
import { SearchInfo } from "./SearchInfo";

export default function SearchComp({
  sessionid,
  refreshKey,
  candidateCount,
  setCandidateCount,
}: {
  sessionid: string;
  refreshKey: number;
  setRefreshKey: (refreshKey: number) => void;
  candidateCount: number;
  setCandidateCount: (candidateCount: number) => void;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  resetChat?: () => void;
}) {
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [openCreditDialog, setOpenCreditDialog] = useState<boolean>(false);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const scrollPositionRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSearchResults = async () => {
    if (hasFetched) {
      return; // Exit if data has already been fetched
    }
    try {
      console.log("try");
      const response = await get_candidate_result(
        sessionid,
        currentPage === 0 ? 1 : currentPage
      );
      console.log("response", response);
      console.log("candidateCount", candidateCount);
      setSearchResults([]);
      if (response && response.data) {
        setShowPagination(response.jf_flag);
        const transformedData = response.data.map(
          (candidate: InitialCandidate) => transformCandidateData(candidate)
        );
        setSearchResults(transformedData);
        setHasFetched(true); // Set the flag to true after fetching
        setIsLoading(false);
        if (response.data.length !== 0) {
          setTotalPages(response.total_page);
          setCurrentPage(response.current_page);
        }
        if (response.data.length < candidateCount) {
          setIsLoading(false);
          await getSearchResults();
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [refreshKey]);

  const handleCloseFullProfile = () => {
    setSelectedCandidate(null);
    // Use setTimeout to ensure the DOM has updated before restoring scroll position
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = scrollPositionRef.current;
      }
    }, 0);
  };

  const handleShowFullProfile = (candidate: Candidate) => {
    if (containerRef.current) {
      scrollPositionRef.current = containerRef.current.scrollTop;
      containerRef.current.scrollTop = 0;
    }
    setSelectedCandidate(candidate);
  };

  if (isLoading) return <CandidateLoadingScreen loadingMessages={[]} />;

  return (
    <div>
      <div
        ref={containerRef}
        className={cn(
          "w-full relative",
          "xl:max-h-[70vh] 2xl:min-h-[70vh]",
          "space-y-4",
          "overflow-y-auto overflow-x-hidden",
          selectedCandidate ? "" : "p-6"
        )}
      >
        {selectedCandidate ? (
          <CandidateProfile
            candidate={selectedCandidate}
            onClose={handleCloseFullProfile}
            session_id={sessionid}
          />
        ) : (
          <SearchInfo
            currentPage={currentPage}
            getSearchResults={getSearchResults}
            handleShowFullProfile={handleShowFullProfile}
            hasFetched={hasFetched}
            searchResults={searchResults}
            sessionid={sessionid}
            setCurrentPage={setCurrentPage}
            setHasFetched={setHasFetched}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
            showPagination={showPagination}
            totalPages={totalPages}
          />
        )}

        <Dialog
          header="Confirm Credit Usage"
          headerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#323130",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
          visible={openConfirmationDialog}
          style={{
            width: "35vw",
            borderRadius: "16px",
            border: "1px solid #C0C0C0",
          }}
          onHide={() => {
            if (!openConfirmationDialog) return;
            setOpenConfirmationDialog(false);
          }}
          draggable={false}
          footer={
            <div className="px-4 pt-4 flex items-center justify-end gap-3">
              <Button
                color="primary"
                variant="light"
                className="text-[#3B4CBF] text-sm font-medium"
                onPress={() => setOpenConfirmationDialog(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="solid"
                className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
                onPress={async () => {
                  try {
                    setOpenConfirmationDialog(false);
                    setIsLoading(true);
                    const clay_response = await callPDL_refresh(
                      sessionid,
                      currentPage + 1
                    );

                    setIsLoading(false);
                    if (clay_response["status_code"] === 400) {
                      console.log("Error in Clay Response", clay_response);
                    } else if (clay_response["status_code"] === 401) {
                      console.log("Error in Clay Response", clay_response);
                      setOpenCreditDialog(true);
                    } else {
                      await new Promise((resolve) => setTimeout(resolve, 4000));
                      await setCurrentPage(currentPage + 1);
                      await setHasFetched(false);
                      await getSearchResults();
                      console.log(clay_response);
                      // setRefreshKey(refreshKey + 1);
                      setCandidateCount(clay_response.processing_candidates);
                    }
                  } catch (error) {
                    console.error("Error calling Clay:", error);
                  }
                }}
              >
                Yes, Continue
              </Button>
            </div>
          }
        >
          <CreditConfirmation />
        </Dialog>

        <Dialog
          visible={openCreditDialog}
          modal
          style={{
            width: "35vw",
            borderRadius: "16px",
            border: "1px solid #C0C0C0",
          }}
          onHide={() => {
            if (!openCreditDialog) return;
            setOpenCreditDialog(false);
          }}
        >
          <NoCreditsLeft />
        </Dialog>
      </div>
    </div>
  );
}
