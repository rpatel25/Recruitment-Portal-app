import React, { useState, useEffect } from 'react';
import { cn } from '@heroui/theme';
import { NewAssessment } from './NewAssessment';
import { ReviewQuestions } from './ReviewQuestions';
import Link from './Link';
import { Reports } from './Reports';
import SavedAssessments from './SavedAssessments';
import { useRouter } from 'next/router';

const assessmentTabs = [
  {
    label: 'New Assessment',
    value: 'New Assessment',
    icon: '/icons/plus_icon_white.svg',
  },
  {
    label: 'Review Questions',
    value: 'Review Questions',
    icon: '/icons/question_point_icon_white.svg',
  },
  { label: 'Link', value: 'Link', icon: '/icons/assessment_links_white.svg' },
  {
    label: 'Reports',
    value: 'Reports',
    icon: '/icons/assessment_reports_white.svg',
  },
  {
    label: 'Saved Assessments',
    value: 'Saved Assessments',
    icon: '/icons/saved_assessment_time.svg',
  },
];

interface AssessmentDetailsProps {
  assessment_id?: string;
}

export const AssessmentDetails: React.FC<AssessmentDetailsProps> = React.memo(
  ({ assessment_id: propAssessmentId }) => {
    const router = useRouter();
    const { assessment_id: queryAssessmentId, tab } = router.query;
    const [selectedTab, setSelectedTab] = useState(0);

    // Use assessment_id from props or query
    const activeAssessmentId = propAssessmentId || queryAssessmentId;

    // Handle tab changes from URL
    useEffect(() => {
      if (tab === 'review-questions') {
        setSelectedTab(1); // Index for Review Questions tab
      }
    }, [tab]);

    // Update URL when tab changes
    const handleTabChange = (index: number) => {
      setSelectedTab(index);

      // Update URL query parameters
      const query: { tab?: string; assessment_id?: string } = {};
      if (index === 1) {
        query.tab = 'review-questions';
        if (activeAssessmentId) {
          query.assessment_id = activeAssessmentId as string;
        }
      }

      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    };

    // Memoize the ReviewQuestions component render
    const reviewQuestionsComponent = React.useMemo(() => {
      if (!activeAssessmentId) {
        return (
          <div className="text-center text-gray-600 p-4">
            No assessment selected. Please create or select an assessment first.
          </div>
        );
      }
      return <ReviewQuestions assessment_id={activeAssessmentId as string} />;
    }, [activeAssessmentId]);

    return (
      <>
        {/* Tabs */}
        <div
          className={cn(
            'w-full h-14',
            'flex items-center gap-1 border rounded-xl',
            'bg-gradient-to-r from-[#483FC5] to-[#864CEF] px-2'
          )}
        >
          {assessmentTabs.map((menu, index) => {
            const isDisabled = index === null;
            return (
              <div
                key={index}
                className={`flex px-3 flex-col justify-center items-center gap-2 cursor-pointer relative
                ${
                  selectedTab === index
                    ? 'rounded-lg bg-white/25 flex items-center h-9 border border-[#B6A7F7]'
                    : ''
                }
                ${isDisabled ? 'pointer-events-none text-gray-400' : ''}`}
                onClick={() => !isDisabled && handleTabChange(index)}
              >
                <span
                  className={cn(
                    'h-6',
                    'flex justify-center items-center gap-2',
                    'text-white',
                    'text-center text-sm font-medium'
                  )}
                >
                  {/* Icon before label */}
                  <img src={menu.icon} alt={menu.label} className="w-4 h-4" />
                  {menu.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 0 && (
          <div className="bg-white rounded-xl p-2">
            <NewAssessment />
          </div>
        )}
        {selectedTab === 1 && (
          <div className="bg-white rounded-xl py-2">
            {reviewQuestionsComponent}
          </div>
        )}
        {selectedTab === 2 && (
          <div className="bg-white rounded-xl py-2">
            <Link />
          </div>
        )}
        {selectedTab === 3 && (
          <div className="bg-white rounded-xl py-2">
            <Reports />
          </div>
        )}
        {selectedTab === 4 && (
          <div className="bg-white rounded-xl py-2">
            <SavedAssessments />
          </div>
        )}
      </>
    );
  }
);
export default AssessmentDetails;
