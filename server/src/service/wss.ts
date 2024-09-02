import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { WsService } from "./ws";

export class WssService {
  async handleConnection(ws: WebSocket, req: IncomingMessage) {
    console.log("CONNECTION MADE");
    const wsService = new WsService(ws);

    ws.on("message", wsService.handleMessage);

    ws.on("close", wsService.handleClose);

    ws.on("error", wsService.handleError);

    ws.on("open", wsService.handleOpen);
  }

  async handleClose(ws: WebSocket, req: IncomingMessage) {
    console.log("WS SERVER CLOSED");
  }

  async handleError(ws: WebSocket, req: IncomingMessage) {
    console.log("WS SERVER ERRORED");
  }
}
