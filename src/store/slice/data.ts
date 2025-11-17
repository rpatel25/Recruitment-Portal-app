import { IGetFilterDetailsResponse } from "@/types/filter.type";

export const initialFilterState: IGetFilterDetailsResponse = {
  status_code: 0,
  response_type: "",
  description: "",
  data: {
    id: "",
    chatbox: {
      id: "",
      collection: "",
    },
    job_details: {
      title: [],
      required_contact: "",
    },
    skills_and_keywords: [],
    industries: [],
    experience: {
      min_years: 0,
      max_year: 0,
      time_spent_at_current_role: {
        dropdown: "",
        min: "",
        max: "",
      },
      min_average_tenure: "",
    },
    location: {
      place: [],
      range: "",
    },
    companies: {
      preferred: [],
      company_hq_location: "",
      company_size: "",
      founded_after: "",
      period: "",
      past: [],
    },
    power_filter: {
      diversity: [],
      security_clearance: [],
    },
    education: {
      degree: "",
      field: "",
      min_graduation_year: "",
      max_graduation_year: "",
    },
    language: {
      dropdown: "",
      value: [],
    },
    excluded_companies: {
      place: [],
    },
    created_at: "",
    recruiting_company: "",
    contact_info: {
      contact_info: "",
    },
  },
};
