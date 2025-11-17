import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetAllAssessmentLinksQuery } from "@/store/services/ApiRequest";
import Exam from "@/components/Assessment/Exam";
import { IAssessmentLink, IAssessmentQuestins } from "@/types/assessment.type";

export const Screening: React.FC = React.memo(() => {
  const router = useRouter();

  // Get the assessment link ID from the URL
  const assessmentLinkId = router.query.id as string;

  console.log("Assessment Link ID:", assessmentLinkId);

  // Fetch all assessment links
  const {
    data: savedAssessmentLinks,
    isLoading,
    error,
  } = useGetAllAssessmentLinksQuery(undefined, {}) as {
    data: IAssessmentLink[] | undefined;
    isLoading: boolean;
    error: any;
  };
  console.log("Saved Assessment Links:", savedAssessmentLinks);

  const selectedLink = savedAssessmentLinks?.find(
    (link) => link.link_id === assessmentLinkId
  );
  console.log("Selected Link:", selectedLink);

  // Extract questions from the selected link
  const questions: IAssessmentQuestins[] = selectedLink?.questions || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading assessment questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">
          Failed to load assessment questions. Please try again later.
        </p>
      </div>
    );
  }

  if (!assessmentLinkId || !selectedLink) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">
          Invalid or expired assessment link. Please check your link and try
          again.
        </p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No questions found for this assessment.</p>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-6"
      style={{
        background: "#F0F6FF",
      }}
    >
      <Exam
        questions={questions}
        onSubmit={(answers) => {
          // TODO: Implement submission logic
          console.log("Submitting answers:", answers);
        }}
      />
    </div>
  );
});
