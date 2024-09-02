import { WebSocketServer } from "ws";
import { WssService } from "../service/wss";

export const wssController = (wss: WebSocketServer) => {
  const wssService = new WssService();

  wss.on("connection", wssService.handleConnection);

  wss.on("close", wssService.handleClose);

  wss.on("error", wssService.handleError);
};
