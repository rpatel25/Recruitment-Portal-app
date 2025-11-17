import { sub_url } from '@/util/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IGetFilterDataByQueryResponse,
  IGetFilterDataResponse,
  IGetFilterDetailsResponse,
} from '@/types/filter.type';
import {
  ALL_TAGS_TYPE,
  TAG_GET_ALL_MEETINGS,
  TAG_GET_CHAT_HISTORY,
  TAG_GET_FILTER_DATA,
  TAG_GET_FILTER_DATA_BY_QUERY_TEXT,
  TAG_GET_FILTER_DETAILS,
  TAG_GET_MEETING_BY_ID,
  TAG_GET_PROJECT_DETAILS_BY_ID,
  TAG_GET_PROJECTS,
  TAG_GET_SESSION_DETAILS,
  TAG_GET_USERS_IN_COMAPNY,
  TAG_GET_ASSESSEMENT,
  TAG_GET_QUESTIONS_FOR_ASSESSMENT,
  TAG_GET_ALL_ASSESSMENT,
  TAG_GET_ALL_ASSESSMENT_LINKS,
  TAG_GET_REPORTS_FOR_ASSESSMENT,
  TAG_GET_USER_STATUS,
} from './TagTypes';
import {
  ICreateProjectRequest,
  IGetProjectDetailsResponse,
  IGetProjectsResponse,
  IGetUsersInCompanyResponse,
  IProjectType,
} from '@/types/project.type';
import baseQueryWithReauth from './baseQuery';
import {
  IChatHistoyResponse,
  ICreateTranscriptRequest,
  ISessionDetailsResponse,
} from '@/types/chat.type';
import {
  IAssessment,
  IAssessmentQuestins,
  IAssessmentLink,
  IAssessmentLinksResponse,
} from '@/types/assessment.type';
import { IGetMeetingsResponse } from '@/types/calendar.type';

export const ApiRequest = createApi({
  reducerPath: 'api',
  keepUnusedDataFor: 5,
  tagTypes: ALL_TAGS_TYPE,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFilterData: builder.query<IGetFilterDataResponse, string>({
      query: (id) => sub_url.getFilter(id),
      providesTags: [TAG_GET_FILTER_DATA],
    }),
    getFilterDataByQueryText: builder.query<
      IGetFilterDataByQueryResponse,
      { category: string; id: string }
    >({
      query: ({ category, id }) => sub_url.getFilterByQueryText(category, id),
      providesTags: [TAG_GET_FILTER_DATA_BY_QUERY_TEXT],
    }),
    createFilter: builder.mutation({
      query: (newItem) => ({
        url: sub_url.createFilter,
        method: 'POST',
        body: newItem,
      }),
    }),
    getFilterDetails: builder.query<IGetFilterDetailsResponse, string>({
      query: (session_id) => sub_url.getFilterDetails(session_id),
      providesTags: [TAG_GET_FILTER_DETAILS],
    }),
    getProjects: builder.query<IGetProjectsResponse, void>({
      query: () => sub_url.getProjects(),
      providesTags: [TAG_GET_PROJECTS],
    }),
    getProjectDetailsbyId: builder.query<IGetProjectDetailsResponse, string>({
      query: (project_id: string) => sub_url.getProjectDetailsbyId(project_id),
      providesTags: [TAG_GET_PROJECT_DETAILS_BY_ID],
    }),
    getUsersInCompany: builder.query<IGetUsersInCompanyResponse, void>({
      query: () => sub_url.getUsersInCompany(),
      providesTags: [TAG_GET_USERS_IN_COMAPNY],
    }),
    createProject: builder.mutation({
      query: (newItem: ICreateProjectRequest) => ({
        url: sub_url.createProject,
        method: 'POST',
        body: newItem,
      }),
    }),
    updateProjectStatus: builder.mutation<
      { id: string },
      Omit<IProjectType, 'members'>
    >({
      query: ({ _id, ...body }) => ({
        url: sub_url.updateProjectStatus(_id),
        method: 'PUT',
        body: body,
      }),
    }),
    getChatHistory: builder.query<IChatHistoyResponse, void>({
      query: () => sub_url.getChatHistory(),
      providesTags: [TAG_GET_CHAT_HISTORY],
    }),
    getSessionDetails: builder.query<ISessionDetailsResponse, string>({
      query: (session_id) => sub_url.getSessionDetails(session_id),
      providesTags: [TAG_GET_SESSION_DETAILS],
    }),
    createTranscript: builder.mutation({
      query: (newItem: ICreateTranscriptRequest) => ({
        url: sub_url.createTranscript,
        method: 'POST',
        body: newItem,
      }),
    }),
    createAssessement: builder.mutation({
      query: (newItem: FormData) => ({
        url: sub_url.createAssessment,
        method: 'POST',
        body: newItem,
      }),
    }),
    getAllAssessments: builder.query<IAssessment[], void>({
      query: () => sub_url.getAllAssessments(),
      providesTags: [TAG_GET_ALL_ASSESSMENT],
    }),
    getAssessmentsById: builder.query<IAssessment, string>({
      query: (assessment_id: string) =>
        sub_url.getAssessmentsById(assessment_id),
      providesTags: [TAG_GET_ASSESSEMENT],
    }),
    getAssessmentDetails: builder.query<IAssessmentQuestins, string>({
      query: (id: string) => sub_url.getAssessmentDetail(id),
      providesTags: [TAG_GET_ASSESSEMENT],
    }),
    generateAssessmentLink: builder.mutation<IAssessmentLink, string>({
      query: (assessment_id: string) => ({
        url: sub_url.generateAssessmentLink(assessment_id),
        method: 'GET',
      }),
      invalidatesTags: [TAG_GET_ALL_ASSESSMENT_LINKS],
    }),
    getQuestionsForAssessment: builder.query<IAssessmentQuestins[], string>({
      query: (assessment_id: string) =>
        sub_url.getQuestionsForAssessment(assessment_id),
      providesTags: [TAG_GET_QUESTIONS_FOR_ASSESSMENT],
    }),
    addQuestionToAssessment: builder.mutation<
      IAssessmentQuestins,
      IAssessmentQuestins
    >({
      query: (question) => ({
        url: sub_url.addQuestionToAssessment(),
        method: 'POST',
        body: question,
      }),
      invalidatesTags: [TAG_GET_QUESTIONS_FOR_ASSESSMENT],
    }),
    updateQuestionInAssessment: builder.mutation<
      IAssessmentQuestins,
      IAssessmentQuestins
    >({
      query: (question) => ({
        url: sub_url.updateQuestionInAssessment(),
        method: 'PUT',
        body: question,
      }),
      invalidatesTags: [TAG_GET_QUESTIONS_FOR_ASSESSMENT],
    }),
    deleteQuestionFromAssessment: builder.mutation<
      void,
      IAssessmentQuestins & { assessment_id: string; question_id: string }
    >({
      query: (question) => ({
        url: sub_url.deleteQuestionFromAssessment(),
        method: 'DELETE',
        body: question,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TAG_GET_QUESTIONS_FOR_ASSESSMENT },
        { type: TAG_GET_ASSESSEMENT, id: arg.assessment_id },
      ],
    }),
    getAllAssessmentLinks: builder.query<IAssessmentLinksResponse, void>({
      query: () => sub_url.getAllAssessmentLinks(),
      providesTags: [TAG_GET_ALL_ASSESSMENT_LINKS],
    }),
    getReportForAssessment: builder.query<Blob, string>({
      query: (assessment_id: string) => ({
        url: sub_url.getReportForAssessment(assessment_id),
        method: 'GET',
        responseHandler: async (response: Response) => await response.blob(),
      }),
      providesTags: [TAG_GET_REPORTS_FOR_ASSESSMENT],
    }),
    createMeeting: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (newItem: any) => ({
        url: sub_url.createMeeting,
        method: 'POST',
        body: newItem,
      }),
    }),
    getAllMeetings: builder.query<IGetMeetingsResponse[], void>({
      query: () => sub_url.getAllMeetings(),
      providesTags: [TAG_GET_ALL_MEETINGS],
    }),
    getMeetingById: builder.query<IGetMeetingsResponse, string>({
      query: (meeting_id: string) => sub_url.getMeetingById(meeting_id),
      providesTags: [TAG_GET_MEETING_BY_ID],
    }),
    getUserStatus: builder.query<boolean, void>({
      query: () => sub_url.getUserStatus(),
      providesTags: [TAG_GET_USER_STATUS],
    }),
    createCandidateExportedAsCsv: builder.mutation({
      query: (newItem: { session_id: string; candidate_ids: string[] }) => ({
        url: sub_url.createCandidateExportedAsCsv,
        method: 'POST',
        body: newItem,
      }),
    }),
  }),
});

export const {
  useGetFilterDataQuery,
  useGetFilterDataByQueryTextQuery,
  useLazyGetFilterDataByQueryTextQuery,
  useCreateFilterMutation,
  useGetFilterDetailsQuery,
  useGetProjectsQuery,
  useGetProjectDetailsbyIdQuery,
  useGetUsersInCompanyQuery,
  useCreateProjectMutation,
  useUpdateProjectStatusMutation,
  useGetChatHistoryQuery,
  useGetSessionDetailsQuery,
  useCreateTranscriptMutation,
  useCreateAssessementMutation,
  useGenerateAssessmentLinkMutation,
  useGetAllAssessmentsQuery,
  useGetAssessmentsByIdQuery,
  useGetAssessmentDetailsQuery,
  useGetQuestionsForAssessmentQuery,
  useAddQuestionToAssessmentMutation,
  useUpdateQuestionInAssessmentMutation,
  useDeleteQuestionFromAssessmentMutation,
  useGetAllAssessmentLinksQuery,
  useLazyGetReportForAssessmentQuery,
  useCreateMeetingMutation,
  useGetAllMeetingsQuery,
  useGetMeetingByIdQuery,
  useGetUserStatusQuery,
  useCreateCandidateExportedAsCsvMutation,
} = ApiRequest;
