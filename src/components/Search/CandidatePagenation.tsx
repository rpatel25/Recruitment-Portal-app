import { Button } from "@heroui/react";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CandidatePagenation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Previous Button */}
      <Button
        isIconOnly
        className="w-7 h-7 bg-[#F0F6FF] rounded-full"
        isDisabled={isFirstPage}
        onPress={onPrevious}
      >
        <img src="./icons/left_arrow.svg" className="w-5 h-5" />
      </Button>

      {/* Page Info */}
      <h5 className="text-[#475569] text-sm font-semibold">
        Page {currentPage} of {totalPages}
      </h5>

      {/* Next Button */}
      <Button
        isIconOnly
        className="w-7 h-7 bg-[#F0F6FF] rounded-full"
        onPress={onNext}
      >
        <img src="./icons/right_arrow.svg" className="w-5 h-5" />
      </Button>
    </div>
  );
}
