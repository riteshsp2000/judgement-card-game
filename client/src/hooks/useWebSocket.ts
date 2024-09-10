import { useCallback, useEffect, useRef, useState } from "react";
import { Request } from "~/types/action.types";

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
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as T;
        if (onMessage) {
          onMessage(data);
        }
      };

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

  const sendMessage = useCallback(
    (message: Request) => {
      if (ws.current && isConnected) {
        ws.current.send(JSON.stringify(message));
      }
    },
    [isConnected]
  );

  return { sendMessage, isConnected };
};

export default useWebSocket;
