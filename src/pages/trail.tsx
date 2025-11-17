import { CandidateProfile } from "@/components/Search/CandidateProfile/index";
import TrailResult from "@/components/TrailResults/TrailResult";
import { trail_candidate } from "@/services/Candidate";
import {
  Candidate,
  InitialCandidate,
  transformCandidateData,
} from "@/types/Candidate";
import React, { useState } from "react";

const candidateStatusOptions = {
  loading: "loading",
  success: "success",
  initial: "initial",
  error: "error",
  fullProfile: "fullProfile",
};

const TrailPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateStatus, setCandidateStatus] = useState<string>(
    candidateStatusOptions.initial
  );
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const handleCloseFullProfile = () => {
    setSelectedCandidate(null);
    setCandidateStatus(candidateStatusOptions.success);
  };

  const handleShowFullProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCandidateStatus(candidateStatusOptions.fullProfile);
  };

  const handleSearch = () => {
    const query = document.querySelector("textarea")?.value;
    if (query && candidateStatus !== candidateStatusOptions.loading) {
      setCandidateStatus(candidateStatusOptions.loading);
      trail_candidate(query)
        .then((get_candidates) => {
          const transformedData = get_candidates.map(
            (candidate: InitialCandidate) => {
              return transformCandidateData(candidate);
            }
          );
          setCandidates(transformedData);
          setCandidateStatus(candidateStatusOptions.success);
        })
        .catch((error) => {
          console.error("Search failed:", error);
          setCandidateStatus(candidateStatusOptions.error);
        });
    }
  };

  const isLoading = candidateStatus === candidateStatusOptions.loading;

  return (
    <div className="flex justify-center items-center h-screen p-4">
      {/* Main Frame - Contains all elements */}
      <div className="w-full h-full rounded-[20px]">
        {/* Rectangle */}
        <div className="w-full h-full flex-shrink-0 rounded-[20px] bg-[#F5F5F5] gap-[10px] p-[10px] flex flex-col">
          {/* Frame 1 - Fixed Search Area */}
          <div className="flex w-full h-fit p-4 flex-col justify-between items-end flex-shrink-0 rounded-[16px] border-[5px] border-solid border-[rgba(223,223,223,0.50)] bg-white">
            {/* Sub Frame */}
            <div className="flex flex-col items-start gap-[27px] self-stretch">
              {/* Sub Sub Frame */}
              <div className="flex p-[10px] justify-center items-center gap-[10px]">
                {/* Text */}
                <textarea
                  placeholder="Ask Luca to find a Senior manager in Toronto with 6+ years of experience"
                  className="text-black placeholder:text-[#C0C0C0] text-base font-medium border-none outline-none bg-transparent resize-none w-[90vw] min-h-[22px]"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.shiftKey) {
                        // Ctrl+Enter: Insert new line
                        return;
                      } else {
                        // Enter: Call search function
                        e.preventDefault();
                        handleSearch();
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Frame 2 - Button */}
            <div
              className={`flex min-h-[48px] px-2 py-1 justify-center items-center gap-[10px] rounded-[1234px] bg-gradient-to-r from-[#483FC5] from-[27.79%] to-[#864CEF] to-[79.83%] ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={isLoading ? undefined : handleSearch}
            >
              {/* Image */}
              <img
                src="/icons/trail_luca.svg"
                alt="Luca"
                className={`w-8 h-8 rounded-full border border-[#3B4CBF] bg-white ${
                  isLoading ? "opacity-50" : ""
                }`}
              />

              {/* Text */}
              <span className="text-white text-sm font-bold">
                {isLoading ? "Searching..." : "Search with Luca"}
              </span>

              {/* Arrow or Loading Spinner */}
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M17.5383 10.6633L11.9133 16.2883C11.7372 16.4644 11.4983 16.5634 11.2492 16.5634C11.0001 16.5634 10.7613 16.4644 10.5852 16.2883C10.409 16.1122 10.3101 15.8733 10.3101 15.6242C10.3101 15.3752 10.409 15.1363 10.5852 14.9602L14.6094 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2487 2.1875 10C2.1875 9.75137 2.28627 9.51292 2.46209 9.3371C2.6379 9.16129 2.87636 9.06252 3.125 9.06252H14.6094L10.5867 5.03751C10.4106 4.86139 10.3117 4.62252 10.3117 4.37345C10.3117 4.12438 10.4106 3.88551 10.5867 3.70939C10.7628 3.53327 11.0017 3.43433 11.2508 3.43433C11.4999 3.43433 11.7387 3.53327 11.9148 3.70939L17.5398 9.33439C17.6273 9.4216 17.6966 9.52523 17.7438 9.63931C17.7911 9.75339 17.8153 9.87569 17.8152 9.99917C17.815 10.1226 17.7905 10.2449 17.743 10.3589C17.6955 10.4728 17.6259 10.5763 17.5383 10.6633Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Scrollable Candidate Cards Area */}
          <div className="flex-1 overflow-y-auto mt-4">
            {candidateStatus === candidateStatusOptions.initial && <></>}

            {candidateStatus === candidateStatusOptions.error && (
              <div className="flex justify-center items-center mt-4 text-red-500">
                <p>Error</p>
              </div>
            )}

            {candidateStatus === candidateStatusOptions.success &&
              candidates.length > 0 && (
                <>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      {candidates.map((candidate) => (
                        <div
                          key={candidate._id}
                          className="border-2 border-[#C0C0C0] rounded-2xl "
                        >
                          <TrailResult
                            candidate={candidate}
                            showFullProfile={handleShowFullProfile}
                            isBlur={false}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-4">
                      <div
                        key={candidates[0]._id}
                        className="border-2 border-[#C0C0C0] rounded-2xl "
                      >
                        <TrailResult
                          candidate={candidates[0]}
                          showFullProfile={() => {}}
                          isBlur={true}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            {candidateStatus === candidateStatusOptions.fullProfile &&
              selectedCandidate && (
                <CandidateProfile
                  candidate={selectedCandidate}
                  onClose={handleCloseFullProfile}
                  session_id="all"
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
