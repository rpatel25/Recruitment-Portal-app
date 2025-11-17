import { useEffect, useState } from "react";

export function useLoadingWebSocket(sessionId: string) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://lookout-test.onrender.com/api/websocket/${sessionId}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log("WS Message:", message);

      if (message === "loading:start") {
        setIsLoading(true);
      } else if (message === "loading:end") {
        setIsLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, [sessionId]);

  return { isLoading };
}
