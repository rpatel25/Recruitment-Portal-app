export interface IProjectMemberType {
  id: string;
  email: string;
  image: string | null;
  company: string | null;
  created_at: string;
  last_login: string;
}

export type StatusType = "active" | "hold" | "closed";

export interface IProjectType {
  _id: string;
  name: string;
  job_title: string;
  seniority: string;
  job_location: string;
  company_hiring_for: string;
  description: string;
  access: "private" | "public";
  status: StatusType;
  created_at: string;
  created_by: {
    id: string;
  };
  members: IProjectMemberType[];
}

export interface IGetProjectsResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: IProjectType[];
}

export interface IGetProjectDetailsResponse {
  status_code: number;
  response_type: string;
  data: IProjectType;
}

export interface IGetUsersInCompanyResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: {
    user: string[];
    company: string;
  };
}

export interface ICreateProjectRequest {
  name: string;
  job_title: string;
  seniority?: string;
  job_location?: string;
  company_hiring_for?: string;
  description?: string;
  access: "public" | "private";
  status: StatusType;
  members?: string[];
}
