import React from "react";
import {
  useGetAllAssessmentsQuery,
  useLazyGetReportForAssessmentQuery,
} from "@/store/services/ApiRequest";
import { Button } from "@heroui/react";
import { cn } from "@heroui/theme";
import { ProgressBar } from "primereact/progressbar";

export const Reports = () => {



  // const { data } = useGetAllAssessmentsQuery();
  // const [triggerDownload, { data: reportData }] =
  //   useLazyGetReportForAssessmentQuery();

  // const handleDownload = async (
  //   assessment_id: string,
  //   candidate_name: string
  // ) => {
  //   try {
  //     const blob = await triggerDownload(assessment_id).unwrap();
  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `${candidate_name} - report.pdf`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //   }
  // };

  // if (
  //   !data ||
  //   !data.length ||
  //   !data.filter((d) => d.status === "evaluated").length
  // )
  //   return <div>No Reports Found!</div>;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="p-1 mt-2 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-xl">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Elizabeth Cooner</span>
              <Button className="ml-4 text-white bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-xl p-4">
                <img src="icons/download_white.svg" alt="download_white" className="w-4 h-4" />
                Download the Report
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Frontend Assessment Test</span>
              <img src="icons/bullet_point_black.svg" alt="bullet_point_black" className="w-1 h-1" />
              <span className="text-sm text-gray-500">16/20 Questions attended</span>
              <img src="icons/bullet_point_gray.svg" alt="bullet_point_gray" className="w-1 h-1" />
              <Button className="text-sm text-white bg-gradient-to-r from-[#34C759] to-[#19612B] rounded-full p-2 h-7 flex items-center gap-1">
                <img src="icons/tick_badge.svg" alt="tick_badge" className="w-4 h-4" />
                Pass
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 border-b border-blue-300 pb-3">
                <span className="text-base">Level 01</span>
                <img src="icons/progressbar_80.svg" alt="progressbar_80" className="w-110 h-4" />
                <span className="text-base bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent">
                  80%
                </span>
                <span className="text-base">Level 02</span>
                <img src="icons/progressbar_80.svg" alt="progressbar_80" className="w-110 h-4" />
                <span className="text-base bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent">
                  80%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end py-1">
              <Button className="h-7 flex items-center">
                <img src="icons/right_arrow.svg" alt="right_arrow" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-1 bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-xl">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Elizabeth Cooner</span>
              <Button className="ml-4 text-white bg-[linear-gradient(112deg,#263BC7_-8.09%,#483FC5_9.02%,#864CEF_44.29%,#327FFF_72.08%,#005B97_97.74%)] rounded-xl p-4">
                <img src="icons/download_white.svg" alt="download_white" className="w-4 h-4" />
                Download the Report
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Frontend Assessment Test</span>
              <img src="icons/bullet_point_black.svg" alt="bullet_point_black" className="w-1 h-1" />
              <span className="text-sm text-gray-500">16/20 Questions attended</span>
              <img src="icons/bullet_point_gray.svg" alt="bullet_point_gray" className="w-1 h-1" />
              <Button className="text-sm text-white bg-gradient-to-r from-[#D94439] to-[#612E19] rounded-full p-2 h-7 flex items-center gap-1">
                <img src="icons/close_badge.svg" alt="close_badge" className="w-4 h-4" />
                Fail
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 border-b border-blue-300 pb-3">
                <span className="text-base">Level 01</span>
                <img src="icons/progressbar_80.svg" alt="progressbar_80" className="w-110 h-4" />
                <span className="text-base bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent">
                  80%
                </span>
                <span className="text-base">Level 02</span>
                <img src="icons/progressbar_30.svg" alt="progressbar_30" className="w-110 h-4" />
                <span className="text-base bg-gradient-to-r from-[#483FC5] to-[#864CEF] bg-clip-text text-transparent">
                  30%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end py-1">
              <Button className="h-7 flex items-center">
                <img src="icons/right_arrow.svg" alt="right_arrow" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* {data
        .filter((d) => d.status === "evaluated")
        .map((report) => (
          <div
            key={report._id}
            className={cn(
              "rounded-2xl border-[3px] border-solid border-[#483FC5]",
              "p-5 mb-2"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-black text-2xl font-semibold">
                  {report.candidate_name}
                </h4>
                <p className="text-black text-base">{report.assessment_name}</p>
              </div>
              <Button
                variant="solid"
                className={cn(
                  "bg-[#3B4CBF] py-2 px-4 rounded-xl",
                  "text-white text-sm font-medium"
                )}
                style={{
                  boxShadow: "0 4px 8px 3px rgba(0, 0, 0, 0.05)",
                }}
                endContent={
                  <img
                    src="/icons/download_white.svg"
                    alt="download"
                    className="w-5 h-5"
                  />
                }
                onPress={() =>
                  handleDownload(report.assessment_id, report.candidate_name)
                }
              >
                {reportData ? "Downloaded Successfully" : "Download Report"}
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <ProgressBar
                value={
                  JSON.parse(report.result)["overall_score_verdict"]
                    .overall_score
                }
                showValue={false}
                color="#34C759"
                className="w-4/5 h-2"
              />
              <p>
                {
                  JSON.parse(report.result)["overall_score_verdict"]
                    .overall_score
                }
                %
              </p>
            </div> */}

            {/* <Button
            variant="solid"
            className={cn(
              "bg-[#E6E9FF] px-4",
              "rounded-lg border border-solid border-[#6776E0]",
              "text-[#3B4CBF] text-sm font-medium"
            )}
            style={{
              boxShadow: "0 4px 8px 3px rgba(0, 0, 0, 0.05)",
            }}
            startContent={
              <img
                src="/icons/mail_blue.svg"
                alt="download"
                className="w-5 h-5"
              />
            }
          >
            Send Email to Candidate
          </Button> 
          </div>
        ))} */}
    </>
  );
};
