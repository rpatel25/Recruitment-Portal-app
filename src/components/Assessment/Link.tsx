import React, { useState } from 'react';
import { cn } from '@heroui/theme';
import GeneratedLink from './GeneratedLink';
import LinkHistory from './LinkHistory';

const assessmentTabs = [
  {
    label: 'Generated Link',
    value: 'Generated Link',
    icon1: '/icons/assessment_link_purple.svg',
    icon2: '/icons/assessment_links_black.svg',
  },
  {
    label: 'Link History',
    value: 'Link History',
    icon1: '/icons/assessment_reports_purple.svg',
    icon2: '/icons/assessment_reports_black.svg',
  },
];

export const Link = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="border-2 border-blue-100 rounded-xl">
      {/* Tabs */}
      <div
        className={cn(
          'w-full h-14',
          'flex items-center border-b-3 border-blue-100'
        )}
      >
        {assessmentTabs.map((menu, index) => {
          const isDisabled = index === null;
          return (
            <div
              key={index}
              className={`flex px-3 pb-1 flex-col justify-center items-center gap-2 cursor-pointer relative
                ${
                  selectedTab === index
                    ? 'flex items-center h-14.5 border-b-3 border-blue-800'
                    : ''
                }
                ${isDisabled ? 'pointer-events-none' : ''}`}
              onClick={() => !isDisabled && setSelectedTab(index)}
            >
              <span
                className={cn(
                  'h-6',
                  'flex justify-center items-center gap-2 px-2',
                  'text-center text-sm',
                  selectedTab === index
                    ? 'bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent font-medium'
                    : 'text-black'
                )}
              >
                {selectedTab === index ? (
                  <img src={menu.icon1} alt={menu.label} className="w-4 h-4" />
                ) : (
                  <img src={menu.icon2} alt={menu.label} className="w-4 h-4" />
                )}
                {menu.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <div className="bg-white rounded-xl p-2 h-[63vh] overflow-scroll">
          <GeneratedLink />
        </div>
      )}
      {selectedTab === 1 && (
        <div className="bg-white rounded-xl p-2 h-[63vh] overflow-scroll">
          <LinkHistory />
        </div>
      )}
    </div>
  );
};
export default Link;
