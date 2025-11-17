import React, { useEffect } from "react";
import { JobDetails } from "./JobDetails";
import { Experience } from "./Experience";
import { Languages } from "./Languages";
import { SkillsKeywords } from "./SkillsKeywords";
import { Location } from "./Location";
import { Companies } from "./Companies";
import { Education } from "./Education";
import { ExcludedCompanies } from "./ExcludedCompanies";
import { useGetFilterDetailsQuery } from "@/store/services/ApiRequest";
import { RecruitmentCompany } from "./RecruitmentCompany";
import { Industry } from "./Industry";
import { ContactInfo } from "./ContactInfo";
interface IProps {
  sessionId: string;
  isResetAll: boolean;
}

export const AdvancedFilters = ({ sessionId, isResetAll }: IProps) => {
  const { data, isLoading, refetch } = useGetFilterDetailsQuery(sessionId);
  const jobDetails = data?.data?.job_details;
  const industries = data?.data?.industries;
  const experience = data?.data?.experience;
  const language = data?.data?.language;
  const skills_and_keywords = data?.data?.skills_and_keywords;
  const location = data?.data?.location;
  const companies = data?.data?.companies;
  // const recruiting_company = data?.data?.recruiting_company;
  const recruiting_company = null;
  const education = data?.data?.education;
  const excluded_companies = data?.data?.excluded_companies;
  const contact_info = data?.data?.contact_info;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="gap-4">
          <div className="container mx-auto grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-6">
              <JobDetails {...jobDetails} isResetAll={isResetAll} />
              <Industry industries={industries} isResetAll={isResetAll} />
              <Experience {...experience} isResetAll={isResetAll} />
              <Languages {...language} isResetAll={isResetAll} />
              <ContactInfo {...contact_info} isResetAll={isResetAll} />
              {/* <PowerFilters {...power_filter} isResetAll={isResetAll} /> */}
              <RecruitmentCompany
                recruiting_company={recruiting_company}
                isResetAll={isResetAll}
              />
            </div>

            <div className="space-y-6">
              <SkillsKeywords
                skills_and_keywords={skills_and_keywords}
                isResetAll={isResetAll}
              />
              <Location {...location} isResetAll={isResetAll} />
              <Companies {...companies} isResetAll={isResetAll} />
              <Education {...education} isResetAll={isResetAll} />
              <ExcludedCompanies
                {...excluded_companies}
                isResetAll={isResetAll}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-bold">
          Loading...
        </div>
      )}
    </>
  );
};
