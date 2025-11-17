import { Company, CompanyDetails, Profile, Score } from "@/util/Types";

export type Candidate = {
  candidate_id: string;
  _id?: string;
  fullName: string;
  jobTitle: string;
  company: string | null;
  location: string | null;
  summary: string | null;
  profilePicture: string | null;
  totalExperience: string;
  linkedinURL: string | null;
  githubURL: string | null;
  skills: Array<string>;
  rank: number;
  companyDetails: CompanyDetails | null;
  educationSummary: string | null;
  workSummary: string | null;
  mobileNumber: string | null;
  email: string | null;
  address: string | null;
  score: Score;
  totalExperienceDisplay: string;
  resume: string | null;
  certifications: string | null;
  profiles: Profile[];
};

export const transformCandidateData = (data: InitialCandidate): Candidate => {
  return {
    candidate_id: data["candidate_id"] || "",
    fullName: data["full_name"],
    jobTitle: data["job_title"],
    company: data["current_company"], // Using Current Company for company
    location: data["location"],
    summary: data["summary"],
    profilePicture: data["profile_picture"] || null,
    totalExperience: data["total_experience"].toString(),
    linkedinURL: data["linkedin_url"],
    githubURL: data["github_url"],
    skills: data["skills"],
    rank: data["rank"],
    companyDetails: data["company_details"] || null,
    educationSummary: data["education_summary"],
    workSummary: data["work_summary"],
    mobileNumber: data["mobile_phone"] || "Not Available",
    email: data["email"] || "Not Available",
    address: data["address"] || "Not Available",
    score: data["score"],
    totalExperienceDisplay: "",
    resume: "",
    certifications: "",
    profiles: data["profiles"],
  };
};

export type CandidateResult = {
  status_code: number;
  response_type: string;
  description: string;
  data: InitialCandidate[];
  total_page: number;
  current_page: number;
  jf_flag: boolean;
};

export type InitialCandidate = {
  full_name: string;
  job_title: string;
  company_domain: string | null;
  linkedin_url: string | null;
  current_company: string | null;
  kaggle_url: string | null;
  github_url: string | null;
  skills: string[];
  location: string | null;
  summary: string | null;
  work_summary: string | null;
  profile_picture: string | null;
  total_experience: Float16Array;
  score: {
    rank: number;
    active_talent_score: number;
    industry_index_score: number;
    project_score: number;
    experience_score: number;
    skill_score: number;
    platform_score: number;
    page: number;
    chatbox_id: string;
  };
  education_summary: string | null;
  mobile_phone: string | null;
  email: string | null;
  address: string | null;
  profiles: Profile[];
  company_details: {
    start_date: string | null;
    name: string | null;
    end_date: string | null;
  };
  candidate_id: string;
  experience: Company[];
  rank: 1;
};
