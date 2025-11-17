import { ChatMessage } from "@/types/chat.type";
import { useEffect, useState } from "react";
import {
  getSessionMessage,
  onAnalyzerInput,
  sendMessageToDFind,
  sendMessageToIFind,
  sendMessageToLuca,
} from "@/services/Chatbot";
import { v4 as uuidv4 } from "uuid";

export const useChatbot = (
  sessionid: string,
  setSessionid: React.Dispatch<React.SetStateAction<string>>,
  chatSession: string,
  setChatSession: React.Dispatch<React.SetStateAction<string>>,
  setHistoryTab?: React.Dispatch<React.SetStateAction<number>>,
  setCandidateCount?: React.Dispatch<React.SetStateAction<number>>,
  candidateCount?: number
) => {
  const [chat, setChat] = useState<ChatMessage[]>([]); // Chat state
  const [loading, setLoading] = useState<boolean>(false); // Typing animation
  const [dots, setDots] = useState<string>(""); // Dots animation
  const [filter, setFilter] = useState<boolean>(false);
  const [saveSession, setSaveSession] = useState<boolean>(false);
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);

  const resetChat = () => {
    setChat([]);
    setChatSession("");
    setSessionid("");
    setLoading(false);
    setDots("");
    setFilter(false);
    setSaveSession(false);
    setOpenFilterDialog(false);
  };

  useEffect(() => {
    const fetchSessionMessages = async () => {
      try {
        if (sessionid !== "" && chatSession === "") {
          setChatSession(sessionid);

          const response = await getSessionMessage(sessionid);

          if (response.status_code === 200) {
            const messages = response.data.map(
              (msg: {
                creeated_at: string | number | Date;
                message: string;
                type: string;
              }) => {
                const dateObj = new Date(msg.creeated_at);

                return {
                  time: dateObj.toLocaleTimeString(),
                  date: dateObj,
                  message: msg.message,
                  type: msg.type === "user" ? "user" : "luca",
                };
              }
            );

            setChat(messages); // Set all messages at once to prevent multiple re-renders
            if (setHistoryTab) setHistoryTab(-1);
          }
        } else {
          if (chatSession === "") {
            const newSession = uuidv4();
            console.log("new session id", newSession);
            setSessionid(newSession);

            setChatSession(newSession);
          }
        }
      } catch (error) {
        console.error("Failed to fetch session messages:", error);
      }
    };

    fetchSessionMessages();

    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleUserInput = async (
    userMessage: string,
    fileName: File[],
    type: number
  ) => {
    if (userMessage != "") {
      const newMessage: ChatMessage = {
        time: new Date().toLocaleTimeString(),
        date: new Date(),
        message: userMessage,
        type: "user",
      };
      setChat((prevChat) => [...prevChat, newMessage]);
    }
    if (fileName.length > 0) {
      const fileNames = fileName.map((file) => file.name);
      const newMessage: ChatMessage = {
        time: new Date().toLocaleTimeString(),
        date: new Date(),
        message: "File Uploaded : " + fileNames.join(", "),
        type: "user",
      };

      setChat((prevChat) => [...prevChat, newMessage]);
    }
    setLoading(true);

    try {
      let response;
      if (type == 1) {
        response = await sendMessageToIFind(userMessage, chatSession);
        const newLucaMessage: ChatMessage = {
          time: new Date().toLocaleTimeString(),
          date: new Date(),
          message: response.data,
          type: "luca",
        };

        setChat((prevChat) => [...prevChat, newLucaMessage]);
      } else if (type == -1) {
        response = await sendMessageToDFind(userMessage, chatSession);
        const newLucaMessage: ChatMessage = {
          time: new Date().toLocaleTimeString(),
          date: new Date(),
          message: response.data,
          type: "luca",
        };

        setChat((prevChat) => [...prevChat, newLucaMessage]);
      } else {
        response = await sendMessageToLuca(
          userMessage,
          chatSession,
          fileName,
          type
        );
        const newLucaMessage: ChatMessage = {
          time: new Date().toLocaleTimeString(),
          date: new Date(),
          message: response.data.reply,
          type: "luca",
        };

        if (response.status_code === 401) {
          console.log("Error in Clay Response", response);
          // setOpenCreditDialog && setOpenCreditDialog(true);
          return;
        }
        if (type == 3 && response.data.is_candidate) {
          if (setCandidateCount) setCandidateCount(1);
          if (setHistoryTab) setHistoryTab(-1);
        } else if (type == 4 && response.data.is_candidate) {
          console.log(
            "response.data.total_candidates",
            response.data.total_candidates
          );
          if (setCandidateCount)
            setCandidateCount(response.data.total_candidates);
          console.log("after setting candidate count", candidateCount);
          if (setHistoryTab) setHistoryTab(-1);
        } else if (response.data.is_candidate) {
          setOpenFilterDialog(true);
        }

        setChat((prevChat) => [...prevChat, newLucaMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // setHistoryTab(-1);
      // alert("Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzerInput = async (
    userMessage: string,
    analyzer_type: string,
    session_id: string
  ) => {
    if (userMessage != "") {
      const newMessage: ChatMessage = {
        time: new Date().toLocaleTimeString(),
        date: new Date(),
        message: userMessage,
        type: "user",
      };
      setChat((prevChat) => [...prevChat, newMessage]);
    }

    setLoading(true);

    try {
      const response = await onAnalyzerInput(
        userMessage,
        analyzer_type,
        session_id
      );
      const newLucaMessage: ChatMessage = {
        time: new Date().toLocaleTimeString(),
        date: new Date(),
        message: response.data,
        type: "luca",
      };
      setChat((prevChat) => [...prevChat, newLucaMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // setHistoryTab(-1);
      // alert("Failed to send the message. Please try again.");
    } finally {
      console.log("chat", chat);
      setLoading(false);
    }
  };
  return {
    chat,
    chatSession,
    dots,
    filter,
    handleUserInput,
    loading,
    openFilterDialog,
    saveSession,
    setFilter,
    setOpenFilterDialog,
    setSaveSession,
    resetChat,
    handleAnalyzerInput,
    setChat,
  };
};
