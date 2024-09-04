import { WebSocketServer } from "ws";
import {
  ACTION,
  JoinGameRequest,
  Request,
  StartGameRequest,
  StartRoundRequest,
} from "~/type/action.type";
import { GameService } from "~/service/game.service";
import { WebSocketRoom } from "~/service/ws.service";
import { Response } from "~/type/reaction.type";

const gameService = new GameService();
const webSocketRoom = new WebSocketRoom();

export const wssController = (wss: WebSocketServer) => {
  wss.on("connection", (ws, req) => {
    console.log("WSS SERVER CONNECTED");

    ws.on("message", (message) => {
      try {
        const data: Request = JSON.parse(message.toString());
        let response: Response;

        switch (data.action.type) {
          case ACTION.CREATE_GAME:
            response = gameService.createGame();
            webSocketRoom.joinRoom(response.game.id, ws);
            webSocketRoom.sendMessageToRoom(response.game.id, response);
            break;

          case ACTION.JOIN_GAME:
            response = gameService.joinGame(
              (data.action.payload as JoinGameRequest).gameId
            );
            webSocketRoom.joinRoom(response.game.id, ws);
            webSocketRoom.sendMessageToRoom(response.game.id, response);
            break;

          case ACTION.START_GAME:
            response = gameService.startGame(
              (data.action.payload as StartGameRequest).gameId
            );
            webSocketRoom.sendMessageToRoom(response.game.id, response);
            break;

          case ACTION.START_ROUND:
            response = gameService.startRound(
              (data.action.payload as StartRoundRequest).gameId
            );
            webSocketRoom.sendMessageToRoom(response.game.id, response);
            break;

          case ACTION.PLAY_CARD:
            gameService.playCard();
            break;

          default:
            gameService.handleInvalidAction();
            break;
        }
      } catch (error) {
        console.error(error);
        console.error("Something went wrong");
      }
    });
  });
};
