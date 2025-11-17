import { StaticsMetric } from "@/types/StaticsMetrics";
import { getUserAccessToken } from "@/util/authToken";
import axios from "axios";

const MONTH_MAP = new Map([
  [1, "Jan"],
  [2, "Feb"],
  [3, "Mar"],
  [4, "Apr"],
  [5, "May"],
  [6, "Jun"],
  [7, "Jul"],
  [8, "Aug"],
  [9, "Sep"],
  [10, "Oct"],
  [11, "Nov"],
  [12, "Dec"],
]);

export async function getStaticsMetric(
  sessionid: string | null
): Promise<StaticsMetric | null> {
  const api_url = process.env.REACT_APP_BACK_URL;

  // const api_url = "https://lookout-test.onrender.com";
  const accessToken = await getUserAccessToken();
  const authStr = "Bearer " + accessToken;

  try {
    if (sessionid) {
      const response = await axios.get(
        `${api_url}/api/header_saved_data?session_id=${sessionid}`,
        {
          headers: { Authorization: authStr },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(`${api_url}/api/header_saved_data`, {
        headers: { Authorization: authStr },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function getSkillsArr(skills: string) {
  const skillsArr = skills ? skills.split("- ") : [];
  return skillsArr;
}

export function calculateExperience(totalExperience: string) {
  const experienceArr = totalExperience ? totalExperience.split(".") : [];
  const experienceInYears = experienceArr.length > 0 ? experienceArr[0] : "0";
  const experienceInMonths = experienceArr.length > 1 ? experienceArr[1] : "0";
  return (
    (experienceInYears && experienceInYears == "1"
      ? "1 Year "
      : " " + experienceInYears + " Years ") +
    (experienceInMonths != "0"
      ? experienceInMonths == "1"
        ? "1 Month "
        : experienceInMonths + " Months "
      : "")
  );
}

export function calculateYearMonth(duration: string) {
  if (duration === "present") return "Present";
  const durationDate = new Date(duration);
  const year = durationDate.getFullYear();
  const month = durationDate.getMonth();
  return MONTH_MAP.get(month) + " " + year;
}
