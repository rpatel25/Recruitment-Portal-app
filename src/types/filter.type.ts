export interface IGetFilterDataResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: {
    required_contact_info?: Array<string>;
    dropdown?: Array<string>;
    time_spent_min?: Array<string>;
    min_avg?: Array<string>;
    time_spent_max?: Array<string>;
    clearance?: Array<string>;
    diversity?: Array<string>;
    company_size?: Array<string>;
    degree?: Array<string>;
  };
}

export interface IGetFilterDataByQueryResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: Array<string>;
}

interface IData {
  id: string;
  chatbox: { id: string; collection: string };
  job_details: {
    title: string[];
    required_contact: string;
  };
  industries: string[];
  skills_and_keywords: string[];
  experience: {
    min_years: number;
    max_year: number;
    time_spent_at_current_role: {
      dropdown: string;
      min: string;
      max: string;
    };
    min_average_tenure: string;
  };
  location: { place: string[]; range: string };
  companies: {
    period: string;
    preferred: string[];
    company_size: string;
    company_hq_location: string;
    founded_after: string;
    past: string[];
  };
  power_filter: { diversity: string[]; security_clearance: string[] };
  education: {
    degree: string;
    field: string;
    min_graduation_year: string;
    max_graduation_year: string;
  };
  language: { dropdown: string; value: string[] };
  excluded_companies: { place: string[] };
  contact_info: { contact_info: string };
  created_at: string;
  recruiting_company: string;
}

export interface IGetFilterDetailsResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: IData;
}

export interface IOption {
  label: string;
  value: string;
}
