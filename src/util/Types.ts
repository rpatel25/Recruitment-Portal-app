export interface StaticsCardType {
  title: string;
  metrics: string;
  icon: string;
}

export interface SearchRowType {
  name: string;
}

export interface FormValues {
  name: string;
  job_title: string;
  seniority: string;
  job_location: string;
  company_hiring_for: string;
  description: string;
  access: "public" | "private";
  members: string[];
}

export interface CardData {
  filter_count: number;
  total_candidates: number;
  chatbox_id: string;
  skills_and_keywords: string[];
  location: { place: string[] };
  last_message: string;
  creeated_at: Date;
  time: string;
  select: boolean;
  session_id: string;
  saved: boolean;
}

export interface CompanyDetails {
  name: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface SocialMedia {
  text: string;
  link: string;
  icon: string;
}

export interface Score {
  rank: number;
  active_talent_score: number;
  industry_index_score: number;
  project_score: number;
  skill_score: number;
  platform_score: number;
  experience_score: number;
  page: number;
  chatbox_id: string;
}

export interface Profile {
  network: string;
  id: string | null;
  url: string;
  username: string | null;
}

export interface Company {
  company: {
    name: string | null;
    size: string | null;
    id: string | null;
    founded: string | null;
    industry: string | null;
    location: {
      name: string | null;
      locality: string | null;
      region: string | null;
      metro: string | null;
      country: string | null;
      continent: string | null;
      street_address: string | null;
      address_line_2: string | null;
      postal_code: string | null;
      geo: string | null;
    };
    linkedin_url: string | null;
    linkedin_id: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    website: string | null;
  };
  location_names: string[];
  end_date: string | null;
  start_date: string | null;
  title: {
    name: string | null;
    class_: string | null;
    role: string | null;
    sub_role: string | null;
    levels: [];
  };
  is_primary: true;
  summary: string | null;
}
