import React, { useState, useEffect } from 'react';
import { cn } from '@heroui/theme';
import { classNames } from '@/util/classNames';
import { Button } from '@heroui/react';

import { useGetAllAssessmentLinksQuery } from '@/store/services/ApiRequest';
import {
  IAssessmentLink,
  IAssessmentLinksResponse,
} from '@/types/assessment.type';

export const GeneratedLink = () => {
  const {
    data: assessmentLinksResponse,
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useGetAllAssessmentLinksQuery(undefined, {
    // Add these options to ensure proper data fetching
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Debug logging
  useEffect(() => {
    console.log('Assessment Links State:', {
      isLoading,
      isFetching,
      isError,
      error,
      data: assessmentLinksResponse,
    });
  }, [assessmentLinksResponse, isLoading, isFetching, isError, error]);

  // Extract the assessment links array from the response
  const assessmentLinks = assessmentLinksResponse?.data;

  const handleDelete = (linkId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete link:', linkId);
  };

  const handleEdit = (linkId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit link:', linkId);
  };

  const handleSendEmail = (linkId: string) => {
    // TODO: Implement send email functionality
    console.log('Send email for link:', linkId);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
        <span className="ml-2">Loading assessment links...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-600">
        Error loading assessment links. Please try again.
        <div className="mt-2 text-sm">
          Error details:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!assessmentLinks?.length) {
    return (
      <div className="p-4 text-center text-gray-600">
        No assessment links available.
        <Button
          onClick={() => refetch()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-1 gap-4">
      {assessmentLinks.map((link) => (
        <div
          key={link.link_id}
          className="bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-2xl p-2"
        >
          <div
            className={cn(
              'bg-white/25 px-3 py-1',
              'rounded-xl border border-solid border-[#483FC5]',
              classNames.flexBetween
            )}
          >
            <span className="text-white text-base font-medium flex items-center gap-2">
              {'Assessment Name - ' + link.link_id || 'Untitled Assessment'}
              <img
                src="/icons/edit_white.svg"
                alt="edit_white"
                className="w-4 h-4"
              />
            </span>
            <Button
              className={cn('hover:bg-white/25', 'px-3 py-2 rounded-full')}
              onClick={() => handleDelete(link.link_id)}
            >
              <img
                src="/icons/delete_white.svg"
                alt="delete_white"
                className="w-5 h-5"
              />
            </Button>
          </div>

          <div className="px-2 flex justify-between items-center gap-4">
            <p className="text-white text-ellipsis text-m flex items-center gap-4">
              {link.link_id}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(link.link_id);
                }}
              >
                <img
                  src="/icons/copy_icon.svg"
                  alt="copy_icon"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            </p>

            <div className="py-2 flex justify-center items-center gap-4">
              <Button
                className={cn(
                  'border-2 border-gray-300 text-blue-800 bg-white',
                  'hover:bg-gray-100',
                  'px-4 py-2 rounded-xl font-medium'
                )}
                onClick={() => handleEdit(link.link_id)}
              >
                <img
                  src="/icons/edit_blue_icon.svg"
                  alt="edit_blue_icon"
                  className="w-4 h-4"
                />
                Edit
              </Button>
              <Button
                className={cn(
                  'border-2 border-gray-300 text-blue-800 bg-white',
                  'hover:bg-gray-100',
                  'px-4 py-2 rounded-xl font-medium'
                )}
                onClick={() => handleSendEmail(link.link_id)}
              >
                <img
                  src="/icons/email_blue.svg"
                  alt="email_blue"
                  className="w-4 h-4"
                />
                Send email
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneratedLink;
