import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;

wss.on("connection", async (ws, req) => {
  // TODO: generate a random unique ID here
  const wsId = 1;

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case "JOIN_GAME":
          break;

        case "CREATE_GAME":
          break;

        case "START_GAME":
          break;

        case "START_ROUND":
          break;

        case "PLAY_CARD":
          break;

        default:
          console.error("invalid action");
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  });
});

server.listen(PORT);
