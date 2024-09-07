import { createContext, PropsWithChildren } from "react";
import { UseWebSocketReturn } from "~/hooks/useWebSocket";

export const WebSocketConnectionContext =
  createContext<UseWebSocketReturn | null>(null);

export const WebSocketConnectionProvider: React.FC<
  PropsWithChildren<{
    webSocket: UseWebSocketReturn;
  }>
> = (props) => {
  return (
    <WebSocketConnectionContext.Provider value={props.webSocket}>
      {props.children}
    </WebSocketConnectionContext.Provider>
  );
};
