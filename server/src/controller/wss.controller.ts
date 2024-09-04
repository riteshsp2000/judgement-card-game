import { WebSocketServer } from "ws";
import {
  ACTION,
  CallHandRequest,
  JoinGameRequest,
  PlayCardRequest,
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
            if (data.game) {
              response = gameService.startGame(data.game?.id);
              webSocketRoom.sendMessageToRoom(response.game.id, response);
            }
            break;

          case ACTION.START_ROUND:
            if (data.game) {
              response = gameService.startRound(data.game.id);
              webSocketRoom.sendMessageToRoom(response.game.id, response);
            }
            break;

          case ACTION.CALL_HANDS:
            console.log(data.game, data.player);
            if (data.game && data.player) {
              console.log("came inside if condition");
              response = gameService.callHand(
                data.game.id,
                data.player.id,
                (data.action.payload as CallHandRequest).numberOfHands
              );
              webSocketRoom.sendMessageToRoom(response.game.id, response);
            }
            break;

          case ACTION.PLAY_CARD:
            if (data.game && data.player) {
              response = gameService.playCard(
                data.game.id,
                data.player.id,
                (data.action.payload as PlayCardRequest).card
              );
              webSocketRoom.sendMessageToRoom(response.game.id, response);
            }
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
