import { WebSocket } from "ws";

export class WebSocketRoom {
  private rooms: Record<string, WebSocket[]> = {};
  private connectionMap = new Map<
    WebSocket,
    { gameId?: string; playerId?: string }
  >();

  constructor() {
    this.rooms = {};
  }

  joinRoom(roomId: string, playerId: string, ws: WebSocket) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push(ws);
    this.connectionMap.set(ws, { gameId: roomId, playerId });
  }

  leaveRoom(ws: WebSocket) {
    this.connectionMap.delete(ws);
    for (const roomId in this.rooms) {
      this.rooms[roomId] = this.rooms[roomId].filter((client) => client !== ws);
      if (this.rooms[roomId].length === 0) {
        delete this.rooms[roomId];
      }
    }
  }

  getConnectionDataFromWs(ws: WebSocket) {
    return this.connectionMap.get(ws);
  }

  deleteConnectionDataByWs(ws: WebSocket) {
    return this.connectionMap.delete(ws);
  }

  sendMessageToRoom(roomId: string, data: any) {
    if (!this.rooms[roomId]) {
      return console.error("NO ROOM FOUND TO SEND MESSAGES");
    }

    this.rooms[roomId].forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    });
  }
}
