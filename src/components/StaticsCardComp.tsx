import { getUserAccessToken } from "@/util/authToken";
import { getStaticsMetric } from "@/util/utils";
import { useEffect, useState } from "react";
import { StaticsMetric } from "../types/StaticsMetrics";
import { StaticsCardType } from "../util/Types";
import StaticsCard from "./StaticsCard";

export default function StaticsCardComp({sessionid, historyTab}: {sessionid: string, historyTab: number}) {
  const [token, setToken] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<StaticsMetric | null>(null);
  const fetchAuthToken = async () => {
    try {
      const token = await getUserAccessToken();

      if (token) {
        setToken(token);
      }
    } catch (error) {
      console.error("Failed to get user access token:", error);
    }
  };

  useEffect(() => {
    fetchAuthToken();
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        if (historyTab==-1){
          const metrics = await getStaticsMetric(sessionid);
          if (metrics) {
            setMetrics(metrics);
          }
        }
        else{
          const metrics = await getStaticsMetric(null);
          if (metrics) {
            setMetrics(metrics);
          }
        }
      } catch (error) {
        console.error("Failed to get metrics:", error);
      }
    };
    fetchMetrics();
  }, [token]);

  const StaticsCardArr: (StaticsCardType & { highlight?: boolean; purpleHighlight?: boolean })[] = [
    {
      title: "Total no of Candidates",
      metrics: metrics ? metrics.data.total_candidates ? metrics.data.total_candidates : "----": "----",
      icon: "statics_candidates_bg_white",
      highlight: true,
    },
    // {
    //   title: "Credits",
    //   metrics: metrics ? metrics.data.credits : "----",
    //   icon: "statics_talent",
    // },
    {
      title: "Total Hours Saved",
      metrics: metrics ? metrics.data.time + "Hrs" : "-Hrs",
      icon: "statics_candidate_bg_white",
      purpleHighlight: true,
    },
    {
      title: "Total Cost/hr Saved",
      metrics: metrics ? "$" + metrics.data.cost : "$---",
      icon: "statics_dollar_bg_white",
      highlight: true,
    },
  ];

  return StaticsCardArr.map((card) => (
    <StaticsCard
      key={card.title}
      title={card.title}
      metrics={card.metrics}
      icon={card.icon}
      highlight={card.highlight}
      purpleHighlight={card.purpleHighlight}
    />
  ));
}
