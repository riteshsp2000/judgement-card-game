import { WebSocket, WebSocketServer } from "ws";
import { RedisPubSub } from "~/service/redisPubSub.service";
import { RedisStore } from "~/service/redisStore.service";
import { WsService } from "~/service/ws.service";

export class WssController {
  private wss: WebSocketServer;

  constructor(wss: WebSocketServer) {
    this.wss = wss;

    this.wss.on("connection", this.handleOnConnection);
    this.wss.on("close", this.handleOnClose);
    this.wss.on("error", this.handleOnError);
  }

  async handleOnConnection(ws: WebSocket) {
    console.info("WSS SERVER CONNECTED");

    const wsService = new WsService(ws);

    ws.on("message", wsService.handleOnMessage);

    ws.on("close", wsService.handleOnClose);

    ws.on("error", wsService.handleOnError);

    ws.on("open", wsService.handleOnOpen);

    ws.on("ping", wsService.handleOnPing);

    ws.on("pong", wsService.handleOnPong);
  }

  handleOnClose() {
    console.info("WSS SERVER CLOSED");
  }

  handleOnError() {
    console.info("WSS SERVER ERRORED");
  }
}
