import { WebSocket } from "ws";

export class WssService {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  handleOnMessage(message: string) {
    console.log("ON MESSAGE: ", message);
  }

  handleOnClose() {
    console.log("ON CLOSE");
  }

  sendMessage(message: unknown) {
    this.ws.send(JSON.stringify(message));
  }
}
