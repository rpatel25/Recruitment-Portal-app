import { Button, cn } from "@heroui/react";
import { Dialog } from "primereact/dialog";
import React, { useRef, useState } from "react";
import { AdvancedFilters } from "../AdvancedFilters/AdvancedFilters";
import { useCreateFilterMutation } from "@/store/services/ApiRequest";

import { useAppSelector } from "@/store/hooks";
import { callPDL, saveSearchApiSingle } from "@/services/Chatbot";

import { CreditConfirmation } from "../AdvancedFilters/CreditConfirmation";
import CandidateLoadingScreen from "../CandidateLoading";
interface IProps {
  sessionId: string;
  saveSession: boolean;
  setSaveSession: (value: boolean) => void;
  chatSession: string;
  openFilterDialog: boolean;
  setOpenFilterDialog: (value: boolean) => void;
  setHistoryTab: React.Dispatch<React.SetStateAction<number>>;
  setSessionid: (value: string) => void;
  refreshKey: number;
  setRefreshKey: (value: number) => void;
  setCandidateCount: (value: number) => void;
}

const ChatbotOptions: React.FC<IProps> = ({
  sessionId,
  saveSession,
  setSaveSession,
  chatSession,
  openFilterDialog,
  setOpenFilterDialog,
  setHistoryTab,
  setSessionid,
  refreshKey,
  setRefreshKey,
  setCandidateCount,
}) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [isResetAll, setIsResetAll] = useState<boolean>(false);

  const [createFilter] = useCreateFilterMutation();
  const job_filter = useAppSelector((state) => state.filterSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openCreditDialog, setOpenCreditDialog] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

  const applyFilters = async () => {
    await createFilter({ session_id: sessionId, job_filter: job_filter });
    setOpenFilterDialog(false);
    setOpenConfirmationDialog(true);
    // setHistoryTab(-1);
  };

  const resetFilters = () => {
    setIsResetAll(true);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap items-start gap-2">
        <Button
          size="sm"
          color="primary"
          startContent={
            <img src="/icons/luca_filter_white.svg" alt="luca_filter_white" />
          }
          className={cn(
            "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-2xl",
            "py-1.5 px-3 text-white text-sm font-medium"
          )}
          onPress={() => setOpenFilterDialog(true)}
        >
          Filters
        </Button>

        {/* {!saveSession && (
          <Button
            size="sm"
            color="primary"
            startContent={<img src="/icons/save.svg" alt="luca_save" />}
            className={cn(
              "bg-[linear-gradient(53deg,#483FC5_27.79%,#897BFF_53.81%,#C4A3FF_79.83%)] rounded-2xl",
              "py-1.5 px-3 text-white text-sm font-medium"
            )}
            onPress={() => {
              setSaveSession(true);
              try {
                saveSearchApiSingle(chatSession, true);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Save
          </Button>
        )} */}
        {saveSession && (
          <div
            className="flex items-center justify-center h-8 px-4 border rounded-2xl border-gray-300 bg-white shadow-sm"
            onClick={() => {
              setSaveSession(false);
              try {
                saveSearchApiSingle(chatSession, false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <img src="/icons/saved.svg" alt="Save Icon" />
            <span className="text-gray-900 text-center text-sm font-medium">
              Save
            </span>
          </div>
        )}
      </div>

      <Dialog
        header="Advanced Filters"
        headerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#323130",
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "28px",
        }}
        visible={openFilterDialog}
        maximizable
        style={{ width: "1100px" }}
        onHide={() => {
          if (!openFilterDialog) return;
          setOpenFilterDialog(false);
        }}
        draggable={false}
        footer={
          <div className="px-4 pt-4 flex items-center justify-end gap-3">
            <Button
              color="primary"
              variant="light"
              className="text-[#3B4CBF] text-sm font-medium"
              onPress={() => resetFilters()}
            >
              Reset All
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
              onPress={() => applyFilters()}
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <AdvancedFilters sessionId={sessionId} isResetAll={isResetAll} />
      </Dialog>

      {isLoading && (
        <CandidateLoadingScreen loadingMessages={loadingMessages} />
      )}

      {!isLoading && (
        <Dialog
          header="Confirm Credit Usage"
          headerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#323130",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
          visible={openConfirmationDialog}
          style={{
            width: "35vw",
            borderRadius: "16px",
            border: "1px solid #C0C0C0",
          }}
          onHide={() => {
            if (!openConfirmationDialog) return;
            setOpenConfirmationDialog(false);
          }}
          draggable={false}
          footer={
            <div className="px-4 pt-4 flex items-center justify-end gap-3">
              <Button
                color="primary"
                variant="light"
                className="text-[#3B4CBF] text-sm font-medium"
                onPress={() => setOpenConfirmationDialog(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="solid"
                className="bg-[#3B4CBF] rounded-lg text-white text-sm font-medium"
                onPress={async () => {
                  try {
                    setOpenConfirmationDialog(false);
                    setIsLoading(true);

                    console.log("WebSocket connected1");

                    socketRef.current = new WebSocket(
                      `wss://lookout-test.onrender.com/api/websocket/${sessionId}`
                    );

                    console.log("WebSocket connected2");

                    socketRef.current.onopen = () => {
                      console.log("WebSocket connected");
                    };

                    socketRef.current.onmessage = (event) => {
                      const data = event.data;
                      setLoadingMessages((prev) => [...prev, data]);

                      if (data === "completed") {
                        setIsLoading(false);
                        socketRef.current?.close();
                      }
                    };

                    socketRef.current.onerror = (error) => {
                      console.error("WebSocket error:", error);
                      setIsLoading(false);
                    };

                    socketRef.current.onclose = () => {
                      console.log("WebSocket closed");
                    };

                    const clay_response = await callPDL(sessionId);

                    setIsLoading(false);
                    if (clay_response["status_code"] === 400) {
                      console.log("Error in Clay Response", clay_response);
                    } else if (clay_response["status_code"] === 401) {
                      console.log("Error in Clay Response", clay_response);
                      setOpenCreditDialog(true);
                    } else {
                      console.log(clay_response);
                      setRefreshKey(refreshKey + 2);
                      setSessionid(sessionId);
                      setHistoryTab(-1);
                      setCandidateCount(clay_response.processing_candidates);
                      setIsLoading(false);
                    }
                  } catch (error) {
                    console.error("Error calling Clay:", error);
                  }
                }}
              >
                Yes, Continue
              </Button>
            </div>
          }
        >
          <CreditConfirmation />
        </Dialog>
      )}
      {!isLoading && (
        <Dialog
          header="Credit Unavailable"
          headerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#323130",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
          visible={openCreditDialog}
          style={{
            width: "35vw",
            borderRadius: "16px",
            border: "1px solid #C0C0C0",
          }}
          onHide={() => {
            if (!openCreditDialog) return;
            setOpenCreditDialog(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <p>
              You have no credits left.
              <br /> Please contact Lookoutai immediately.
            </p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ChatbotOptions;
