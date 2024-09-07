import { useCallback, useEffect, useRef, useState } from "react";
import { Request } from "~/types/action.types";

// Define types for the WebSocket hook
export type WebSocketHookOptions<T> = {
  url: string;
  onMessage?: (message: T) => void;
};

export type UseWebSocketReturn = {
  sendMessage: (message: Request) => void;
  isConnected: boolean;
};

const useWebSocket = <T>({
  url,
  onMessage,
}: WebSocketHookOptions<T>): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ws.current) {
      // Create WebSocket connection
      ws.current = new WebSocket(url);

      // Handle connection open
      ws.current.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");
      };

      // Handle incoming messages
      ws.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as T;
        console.log("INCOMING", data);
        if (onMessage) {
          onMessage(data);
        }
      };

      // Handle WebSocket close
      ws.current.onclose = () => {
        setIsConnected(false);
        console.log("WebSocket disconnected");
      };
    }

    // Cleanup on component unmount
    // return () => {
    //   console.log("came here");
    //   ws.current?.close();
    // };
  }, [url, onMessage]);

  // Send message through WebSocket
  const sendMessage = useCallback(
    (message: Request) => {
      if (ws.current && isConnected) {
        console.log("SENDING MESSAGE: ", message);
        ws.current.send(JSON.stringify(message));
      }
    },
    [isConnected]
  );

  return { sendMessage, isConnected };
};

export default useWebSocket;
