import React, { useState } from "react";
import { SearchFilter } from "./SearchFilter";
import SearchResult from "./SearchResult";
import { Candidate } from "@/types/Candidate";
import { cn } from "@heroui/theme";
import SaveCandidateDialog from "./SaveCandidateDialog";
import { useCreateCandidateExportedAsCsvMutation } from "@/store/services/ApiRequest";

interface IProps {
  setOpenConfirmationDialog: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  getSearchResults: () => Promise<void>;
  setHasFetched: (value: boolean) => void;
  hasFetched: boolean;
  showPagination: boolean;
  searchResults: Candidate[];
  handleShowFullProfile: (val: Candidate) => void;
  sessionid: string;
}

export const SearchInfo = ({
  setOpenConfirmationDialog,
  setCurrentPage,
  currentPage,
  totalPages,
  getSearchResults,
  setHasFetched,
  hasFetched,
  showPagination,
  searchResults,
  handleShowFullProfile,
  sessionid,
}: IProps) => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);

  const [createCsv] = useCreateCandidateExportedAsCsvMutation();

  const checked =
    selectedCandidates.length === searchResults.length ? true : false;

  const onChangeCheckbox = () => {
    if (selectedCandidates.length < searchResults.length) {
      setSelectedCandidates(searchResults.map((sr) => sr.candidate_id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const onDownloadCandidate = async () => {
    try {
      const blob = await createCsv({
        candidate_ids: selectedCandidates,
        session_id: sessionid,
      }).unwrap();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `candidates report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <SearchFilter
        setOpenConfirmationDialog={setOpenConfirmationDialog}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        getSearchResults={getSearchResults}
        setHasFetched={setHasFetched}
        hasFetched={hasFetched}
        showPagination={showPagination}
        selectedCandidates={selectedCandidates}
        onChangeCheckbox={onChangeCheckbox}
        checked={checked}
        setShowSaveDialog={setShowSaveDialog}
        onDownloadCandidate={onDownloadCandidate}
      />

      {searchResults.map((candidate) => (
        <div
          key={candidate._id}
          className={cn(
            "bg-white p-4",
            "border border-solid border-[#C8D2FF] rounded-xl"
          )}
        >
          <SearchResult
            candidate={candidate}
            handleShowFullProfile={handleShowFullProfile}
            setSelectedCandidates={setSelectedCandidates}
            selectedCandidates={selectedCandidates}
            setShowSaveDialog={setShowSaveDialog}
          />
        </div>
      ))}

      <SaveCandidateDialog
        visible={showSaveDialog}
        onHide={() => setShowSaveDialog(false)}
        candidate_ids={selectedCandidates}
        sessionid={sessionid}
      />
    </>
  );
};
