import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import CandidatePagenation from "./CandidatePagenation";
import { CustomCheckbox } from "../custom/CustomCheckbox";

interface IProps {
  setOpenConfirmationDialog: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  getSearchResults: () => Promise<void>;
  setHasFetched: (value: boolean) => void;
  hasFetched: boolean;
  showPagination: boolean;
  selectedCandidates: string[];
  onChangeCheckbox: () => void;
  checked: boolean;
  setShowSaveDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onDownloadCandidate: () => void;
}

export const SearchFilter = ({
  setOpenConfirmationDialog,
  setCurrentPage,
  currentPage,
  totalPages,
  getSearchResults,
  setHasFetched,
  hasFetched,
  showPagination,
  selectedCandidates,
  onChangeCheckbox,
  checked,
  setShowSaveDialog,
  onDownloadCandidate,
}: IProps) => {
  // Effect to trigger search when hasFetched changes
  useEffect(() => {
    if (!hasFetched) {
      getSearchResults();
    }
  }, [hasFetched, currentPage]);

  const handleSaveCandidate = () => {
    setShowSaveDialog(true);
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setHasFetched(false);
    }
  };

  const onNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setHasFetched(false);
    } else {
      setOpenConfirmationDialog(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full p-3.5 mb-4",
          "border border-solid border-[#C8D2FF] rounded-xl",
          "flex items-center justify-between"
        )}
      >
        <div className="flex items-center gap-3">
          <CustomCheckbox
            labelText="Select All"
            onChangeCheckbox={onChangeCheckbox}
            checked={checked}
          />

          {selectedCandidates.length > 0 ? (
            <Button
              size="sm"
              variant="solid"
              color="primary"
              className={cn(
                "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]",
                "py-1.5 px-3 rounded-lg",
                "text-white text-center text-sm font-semibold"
              )}
              onPress={handleSaveCandidate}
            >
              Save to pipeline
            </Button>
          ) : null}

          {selectedCandidates.length > 0 ? (
            <Button
              size="sm"
              variant="solid"
              color="primary"
              className={cn(
                "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)]",
                "py-1.5 px-3 rounded-lg",
                "text-white text-center text-sm font-semibold"
              )}
              onPress={onDownloadCandidate}
            >
              Download
            </Button>
          ) : null}
        </div>

        {showPagination && (
          <CandidatePagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        )}
      </div>
    </>
  );
};
