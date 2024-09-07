import { useCallback, useEffect, useRef, useState } from "react";

// Define types for the WebSocket hook
export type WebSocketMessage = Record<string, unknown>; // Adjust this type according to your message structure
export type WebSocketHookOptions<T> = {
  url: string;
  onMessage?: (message: T) => void;
};

export type UseWebSocketReturn = {
  sendMessage: (message: WebSocketMessage) => void;
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
    (message: WebSocketMessage) => {
      if (ws.current && isConnected) {
        ws.current.send(JSON.stringify(message));
      }
    },
    [isConnected]
  );

  return { sendMessage, isConnected };
};

export default useWebSocket;
