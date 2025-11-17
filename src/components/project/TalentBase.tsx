import {
  Candidate,
  InitialCandidate,
  transformCandidateData,
} from "@/types/Candidate";
import { useEffect, useState, useRef } from "react";
import CandidateLoadingScreen from "../CandidateLoading";
import { CandidateProfile } from "../Search/CandidateProfile/index";
import { cn } from "@heroui/theme";
import {
  get_pipeline_candidates,
  get_talent_base_candidates,
  remove_candidate,
  save_candidate,
} from "@/services/TalentBase";
import TalentBaseResult from "./TalentBaseResult";

export default function TalentBase({
  projectId,
  talentBaseFlag,
}: {
  projectId: string;
  talentBaseFlag: boolean;
}) {
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [savedCandidates, setSavedCandidates] = useState<string[]>([]);

  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const scrollPositionRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSearchResults = async () => {
    if (hasFetched) {
      return; // Exit if data has already been fetched
    }
    try {
      console.log("try");
      let response;
      if (talentBaseFlag) {
        response = await get_talent_base_candidates(projectId);
      } else {
        response = await get_pipeline_candidates(projectId);
      }
      console.log("response", response);
      setSearchResults([]);
      if (response && response.data) {
        const transformedData = response.data.map(
          (candidate: InitialCandidate) => transformCandidateData(candidate)
        );
        setSearchResults(transformedData);
        setHasFetched(true); // Set the flag to true after fetching
        setIsLoading(false);
      }
      if (
        talentBaseFlag &&
        response.talentbase &&
        response.talentbase.saved_candidates
      ) {
        const savedCandidates = response.talentbase.saved_candidates;
        const savedCandidatesIds = savedCandidates.map(
          (candidate: Candidate) => candidate._id
        );
        console.log("savedCandidatesIds", savedCandidatesIds);
        setSavedCandidates(savedCandidatesIds);
      } else if (response.data) {
        const pipelineCandidates = response.data;
        const pipelineCandidatesIds = pipelineCandidates.map(
          (candidate: Candidate) => candidate.candidate_id
        );
        console.log("pipelineCandidatesIds", pipelineCandidatesIds);
        setSavedCandidates(pipelineCandidatesIds);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

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

  const handleSaveClick = async (candidate: Candidate, saved: boolean) => {
    console.log("save click", candidate, saved);
    const candidateId = candidate.candidate_id;
    if (candidateId) {
      let response;
      if (saved) {
        response = await remove_candidate(projectId, candidateId);
      } else {
        response = await save_candidate(projectId, [candidateId]);
      }
      console.log("response", response);
      if (response && response.status_code == 200) {
        const newSavedCandidates = savedCandidates.includes(candidateId)
          ? savedCandidates.filter((c) => c !== candidateId)
          : [...savedCandidates, candidateId];
        setSavedCandidates(newSavedCandidates);
      }
    }
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
          <div className="p-6">
            <CandidateProfile
              candidate={selectedCandidate}
              onClose={handleCloseFullProfile}
              session_id="all"
            />
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-2 w-full">
              {searchResults.map((candidate) => (
                <div
                  key={candidate._id}
                  className="border-2 border-[#C0C0C0] rounded-2xl "
                >
                  <TalentBaseResult
                    candidate={candidate}
                    showFullProfile={handleShowFullProfile}
                    saved={savedCandidates.includes(candidate.candidate_id)}
                    onSaveClick={handleSaveClick}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
