import { WebSocket } from "ws";

export class WebSocketRoom {
  private rooms: Record<string, WebSocket[]> = {};

  constructor() {
    this.rooms = {};
  }

  joinRoom(roomId: string, ws: WebSocket) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push(ws);
  }

  leaveRoom(ws: WebSocket) {
    for (const roomId in this.rooms) {
      this.rooms[roomId] = this.rooms[roomId].filter((client) => client !== ws);
      if (this.rooms[roomId].length === 0) {
        delete this.rooms[roomId];
      }
    }
  }

  sendMessageToRoom(roomId: string, data: any) {
    if (!this.rooms[roomId]) throw new Error("NO ROOM FOUND TO SEND MESSAGE");

    this.rooms[roomId].forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    });
  }
}
