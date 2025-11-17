import { getUserAccessToken } from "@/util/authToken";

const api_url = process.env.REACT_APP_BACK_URL;

export const create_talent_base = async (
  project_id: string,
  candidate_ids: string[],
  sessionid: string
) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(`${api_url}/api/talentbase`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionid,
        project: project_id,
        saved_candidates: candidate_ids,
      }),
    });
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};

export const get_talent_base_candidates = async (project_id: string) => {
  try {
    const token = await getUserAccessToken();

    const response = await fetch(
      `${api_url}/api/talentbase/candidates/${project_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};

export const save_candidate = async (
  project_id: string,
  candidate_ids: string[]
) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/talentbase/save_candidate_bulk`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_id: project_id,
          candidates: candidate_ids,
        }),
      }
    );
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};

export const remove_candidate = async (
  project_id: string,
  candidate_id: string
) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/talentbase/remove_candidate/${project_id}/${candidate_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};

export const get_pipeline_candidates = async (project_id: string) => {
  try {
    const token = await getUserAccessToken();
    const response = await fetch(
      `${api_url}/api/talentbase/get_saved_candidates/${project_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`API error: ${response.statusText}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Network error in API call:", error);
    return [];
  }
};
