export interface IAssessmentQuestins {
  question_id: string;
  assessment_id: string;
  question: string;
  type: string;
  options?: string[];
  answer: string | null;
  metadata: {
    id: string;
    title: string;
    difficulty: string;
    time_limit_min: number;
    question_type: string;
    prompt: string;
    starter_code: string | null;
    assets: string[];
    expected_concepts: string[];
    answer_guidance: string;
    rubric_id: string;
    options?: string[];
  };
  result: Record<string, unknown> | null;
}

export interface IAssessment {
  _id: string;
  assessment_id: string;
  assessment_name: string;
  created_by: {
    id: string;
    collection: string;
  };
  job_description_url: string;
  candidate_name: string;
  skills: string[];
  status: "created" | "taken" | "evaluated";
  questions: IAssessmentQuestins[];
  result: string;
  created_at: string;
}

export interface ICreateAssessmentRequest {
  file: File;
  candidate_name: string;
  skills: string[];
}

export interface IAssessmentLink {
  _id: string;
  link_id: string;
  questions: IAssessmentQuestins[];
  assigned_by: {
    id: string;
    email: string;
    image: string | null;
    company: string | null;
    name: string | null;
    job_title: string | null;
    credit: number;
    status: boolean;
    phone_mobile: string | null;
    created_at: string;
    last_login: string;
  };
  candidate: string;
  result: string | null;
  status: "created" | "taken" | "evaluated";
  jd_file: string;
  skills: string[];
  assessment_type: string[];
  assessment_name: string; // need to add to api
  assessment_id: string; // need to add to api
  created_at: string;
}

export interface IAssessmentLinksResponse {
  status: string;
  message: string;
  data: IAssessmentLink[];
}

interface IEmailRecipient {
  email: string;
  identifier: string;
}

export interface ISendEmailRequest {
  to: IEmailRecipient[];
  subject: string;
  body: string;
  link_id?: string;
}
