import { useContext } from "react";
import { WebSocketConnectionContext } from "~/contexts/WebSocketConnectionProvider";

export const useWebSocketConnection = () => {
  return useContext(WebSocketConnectionContext);
};
