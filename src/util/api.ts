export const base_url = process.env.REACT_APP_BACK_URL;
export const sub_url = {
  getFilter: (id: string) => `/api/filter_data/${id}`,
  getFilterByQueryText: (category: string, id: string) =>
    `/api/filter_query/${category}/${id}`,
  createFilter: `api/job_filter`,
  getFilterDetails: (session_id: string) => `/api/job_filter/${session_id}`,
  getProjects: () => `/api/projects`,
  getProjectDetailsbyId: (project_id: string) => `/api/project/${project_id}`,
  getUsersInCompany: () => `/api/users-in-company`,
  createProject: `api/project`,
  updateProjectStatus: (project_id: string) => `/api/project/${project_id}`,
  getChatHistory: () => `/api/get_chat_history`,
  getSessionDetails: (session_id: string) =>
    `/api/get_session_message?session_id=${session_id}`,
  createTranscript: `/api/transcript`,
  createAssessment: `api/create_assessment`,
  getAllAssessments: () => `/api/get_all_assessments`,
  getAssessmentsById: (assessment_id: string) =>
    `/api/get_assessment_by_id?assessment_id=${assessment_id}`,
  updateAssessmentStatus: (assessment_id: string) =>
    `/api/assessment/${assessment_id}`,
  getAssessmentDetail: (id: string) => `api/get_questions/${id}`,
  generateAssessmentLink: (assessment_id: string) =>
    `/api/generate_assessment_link?assessment_id=${assessment_id}`,
  getQuestionsForAssessment: (assessment_id: string) =>
    `api/get_questions/${assessment_id}`,
  addQuestionToAssessment: () => `/api/add_question_to_assessment/`,
  updateQuestionInAssessment: () => `/api/edit_question_in_assessment/`,
  deleteQuestionFromAssessment: () => `/api/delete_question_from_assessment/`,
  getAllAssessmentLinks: () => `/api/get_all_assessment_link/`,
  getReportForAssessment: (assessment_id: string) =>
    `api/generate_report/${assessment_id}`,
  createMeeting: `/api/meeting`,
  getAllMeetings: () => `/api/meeting`,
  getMeetingById: (meeting_id: string) => `/api/meeting/${meeting_id}`,
  getUserStatus: () => `/api/get_user_status`,
  createCandidateExportedAsCsv: `api/export_single_candidate_csv`,
};
