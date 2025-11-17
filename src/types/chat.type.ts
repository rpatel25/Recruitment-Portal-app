export interface ChatMessage {
  time: string;
  date: Date;
  message: string;
  type: "user" | "luca";
}

export interface IChatHistoyResponse {
  status_code: 200;
  response_type: string;
  description: string;
  data: IData[];
}

export interface IData {
  id: string;
  session_id: string;
  saved: boolean;
  created_at: string;
  scroll_token: string | null;
  total_candidate: number | null;
  logic: number;
  title: string;
  type: "normal" | "transcript";
  user: {
    id: string;
    collection: string;
  };
}

export interface ISessionDetailsResponse {
  status_code: number;
  response_type: string;
  description: string;
  data: ISessionData[];
}

export interface ISessionData {
  chat_id: string;
  message: string;
  type: string;
  creeated_at: string;
}

export interface MenuItem {
  id: number;
  label: string;
  icon: string;
}

export interface IConversation {
  user_id: string;
  transcript: string[];
  summary: string[];
  created_at: {
    $date: string;
  };
  title: string;
  duration: string;
  _id: { $oid: string };
}

export interface ICreateTranscriptRequest {
  transcript: string;
  session_id: string;
}
