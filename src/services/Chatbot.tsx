/* eslint-disable @typescript-eslint/no-explicit-any */
const api_url = process.env.REACT_APP_BACK_URL;

import { getUserAccessToken } from "@/util/authToken";

// Define type for chat session response (modify as needed)
interface ChatResponse {
  [x: string]: any;
  status_code: number;
  data: any; // Replace `any` with a more specific type if you know the structure
}

// Define type for filter response (modify as needed)
interface FilterResponse {
  filters: string[]; // Adjust type if the structure of filters is more complex
}

export const sendMessageToIFind = async (
  message: string,
  chatSession: string
): Promise<ChatResponse> => {
  const token = await getUserAccessToken();

  try {
    const response = await fetch(
      `${api_url}/api/get_ifind_response?query=${message}&session_id=${chatSession}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const sendMessageToDFind = async (
  message: string,
  chatSession: string
): Promise<ChatResponse> => {
  const token = await getUserAccessToken();

  try {
    const response = await fetch(
      `${api_url}/api/get_dfind_response?query=${message}&session_id=${chatSession}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

// Function to send message to Luca
export const sendMessageToLuca = async (
  message: string,
  chatSession: string,
  file: File[],
  chat_type: number
): Promise<ChatResponse> => {
  const token = await getUserAccessToken();

  try {
    // const response = await fetch(`${api_url}/api/luca_message`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     type: "user",
    //     message: message,
    //     session_id: chatSession,
    //   }),
    // });

    const formData = new FormData();
    if (file) file.forEach((f) => formData.append("file", f));
    formData.append("message", message);
    formData.append("session_id", chatSession);
    formData.append("chat_type", chat_type.toString());
    const response = await fetch(`${api_url}/api/luca_message`, {
      method: "POST",
      headers: {
        // "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

// Function to get filters
export const getFilters = async (): Promise<FilterResponse> => {
  try {
    const response = await fetch(`${api_url}/api/get_filters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const saveSearchApiSingle = async (
  session_id: string,
  saved: boolean = true
): Promise<void> => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/save_session?session_id=${session_id}&saved=${saved}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const saveSearchApi = async (
  chatbox_ids: string[],
  saved: boolean = true
): Promise<void> => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/save_session/group?saved=${saved}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatbox_ids: chatbox_ids }),
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const deleteSearchApi = async (chatbox_ids: string[]): Promise<void> => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/delete_session/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatbox_ids: chatbox_ids }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const getSessionMessage = async (session_id: string) => {
  const token = await getUserAccessToken();
  try {
    const response = await fetch(
      `${api_url}/api/get_session_message?session_id=${session_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    try {
      // return await response.json() as LoginResponse;
      return await response.json();
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      throw new Error("Error parsing JSON response");
    }
  } catch (error) {
    console.error("Network error in API call:", error);
    throw new Error("Network error occurred");
  }
};

export const getStaticsMetric = async () => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/header_saved_data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const getJobFilter = async (session_id: string) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/job_filter/${session_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const callClay = async (session_id: string) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/call_clay/${session_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const callPDL = async (session_id: string) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/call_pdl/${session_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const callPDL_refresh = async (session_id: string, page: number) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/refresh_candidate/${session_id}?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to fetch filters");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error; // Rethrow network errors for the caller to handle
  }
};

export const get_speech_to_text = async (file: Blob) => {
  try {
    const token = await getUserAccessToken();
    const formData = new FormData();
    console.log(file);
    formData.append("file", file, "audio.wav");

    const response = await fetch(`${api_url}/api/stt`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to convert speech to text");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error;
  }
};

export const onAnalyzerInput = async (
  input: string,
  analyzer_type: string,
  session_id: string
) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/get_analyzer_response?session_id=${session_id}&analyzer_type=${analyzer_type}&query=${input}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      throw new Error("Failed to create analyzer session");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    throw error;
  }
};
