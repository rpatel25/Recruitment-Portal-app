import { getUserAccessToken } from "@/util/authToken";

const api_url = process.env.REACT_APP_BACK_URL;

export const getRecentSearch = async () => {
  const token = await getUserAccessToken();
  try {
    const response = await fetch(`${api_url}/api/get_search_history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export const getSavedSearch = async () => {
  const token = await getUserAccessToken();
  try {
    const response = await fetch(`${api_url}/api/get_saved_session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
