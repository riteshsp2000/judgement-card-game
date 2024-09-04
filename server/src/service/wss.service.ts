import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";

export class WssService {
  async handleConnection(ws: WebSocket, req: IncomingMessage) {
    console.log("WSS CONNECTION ESTABLISHED");
  }

  async handleClose(ws: WebSocket, req: IncomingMessage) {
    console.log("WS SERVER CLOSED");
  }

  async handleError(ws: WebSocket, req: IncomingMessage) {
    console.log("WS SERVER ERRORED");
  }
}
