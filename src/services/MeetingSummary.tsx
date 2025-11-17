import axios from "axios";

export async function getMeetingsConversations(username: string | null) {
    // const api_url = process.env.REACT_AI_NOTETAKER_BACK_URL;
    console.log("user = ", username)
    const api_url = "https://lookoutai-ai-notetaker-backend.onrender.com";
    try{
      const response = await axios.get(`${api_url}/transcripts/?user_id=${username}`,
        {
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        return response.data;
    } catch(error) {
        console.error("Error fetching conversations:", error);
    }
  }