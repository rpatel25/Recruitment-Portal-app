const api_url = process.env.REACT_APP_BACK_URL;

interface UserRegister {
  name?: string;
  company?: string;
  job_title?: string;
}

interface LoginResponse {
  credit: number;
  description: string;
  response_type: string;
  status: boolean;
  status_code: number;
}

export const login = async (token: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${api_url}/api/login`, {
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
      return (await response.json()) as LoginResponse;
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      throw new Error("Error parsing JSON response");
    }
  } catch (error) {
    console.error("Network error in API call:", error);
    throw new Error("Network error occurred");
  }
};

export const registerUser = async (token: string, user: UserRegister) => {
  console.log("registerUser", token, user);
  try {
    const response = await fetch(`${api_url}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: user }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    try {
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
