import { CandidateResult } from "@/types/Candidate";
import { getUserAccessToken } from "@/util/authToken";

const api_url = process.env.REACT_APP_BACK_URL;

export const get_candidate_result = async (
  session_id: string,
  page: number = 1
): Promise<CandidateResult | null> => {
  try {
    const token = await getUserAccessToken();

    const response = await fetch(
      `${api_url}/api/get_candidate_result/${session_id}?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return null;
  }
};

export const download_candidate_result = async (session_id: string) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/export_candidates_csv/${session_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return false;
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Set filename from response headers or use default
    const contentDisposition = response.headers.get("content-disposition");
    let filename = "candidates.csv";
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Network error in API call:", error);
    return false;
  }
};

export const download_single_candidate_result = async (
  session_id: string,
  candidate_id: string
) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/export_single_candidate_csv/${session_id}/${candidate_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return false;
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Set filename from response headers or use default
    const contentDisposition = response.headers.get("content-disposition");
    let filename = "candidates.csv";
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Network error in API call:", error);
    return false;
  }
};

export const trail_candidate = async (query: string, count: number = 1) => {
  try {
    const response = await fetch(`${api_url}/api/trail_candidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        count: count,
      }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};
