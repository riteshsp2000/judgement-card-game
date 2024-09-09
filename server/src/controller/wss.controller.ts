import { WebSocketServer, WebSocket } from "ws";
import {
  ACTION,
  CallHandRequest,
  JoinGameRequest,
  PlayCardRequest,
  Request,
} from "~/type/action.type";
import { GameService } from "~/service/game.service";
import { WebSocketRoom } from "~/service/ws.service";
import { Response } from "~/type/reaction.type";
import { Game } from "~/dto/game";

const gameService = new GameService();
const webSocketRoom = new WebSocketRoom();

const connectionMap = new Map<
  WebSocket,
  { gameId?: string; playerId?: string }
>();

export const wssController = (wss: WebSocketServer) => {
  wss.on("connection", (ws, req) => {
    console.log("WSS SERVER CONNECTED");

    ws.on("message", (message) => {
      try {
        const data: Request = JSON.parse(message.toString());
        let responseWithoutAction: Omit<Response, "action">;

        switch (data.action.type) {
          case ACTION.CREATE_GAME:
            responseWithoutAction = gameService.createGame();
            webSocketRoom.joinRoom(responseWithoutAction.game.id, ws);
            connectionMap.set(ws, {
              gameId: responseWithoutAction.game.id,
              playerId: responseWithoutAction?.player?.id,
            });
            break;

          case ACTION.JOIN_GAME:
            responseWithoutAction = gameService.joinGame(
              (data.action.payload as JoinGameRequest).gameId
            );
            webSocketRoom.joinRoom(responseWithoutAction.game.id, ws);
            connectionMap.set(ws, {
              gameId: responseWithoutAction.game.id,
              playerId: responseWithoutAction?.player?.id,
            });
            break;

          case ACTION.LEAVE_GAME:
            responseWithoutAction = gameService.removePlayerFromGame(
              data.game?.id,
              data.player?.id
            );
            webSocketRoom.leaveRoom(ws);
            gameService.removePlayerFromGame(data.game?.id, data.player?.id);
            connectionMap.delete(ws);
            break;

          case ACTION.START_GAME:
            responseWithoutAction = gameService.startGame(data.game?.id);
            break;

          case ACTION.START_ROUND:
            responseWithoutAction = gameService.startRound(data.game?.id);
            break;

          case ACTION.CALL_HANDS:
            responseWithoutAction = gameService.callHand(
              data.game?.id,
              data.player?.id,
              (data.action.payload as CallHandRequest).numberOfHands
            );
            break;

          case ACTION.PLAY_CARD:
            responseWithoutAction = gameService.playCard(
              data.game?.id,
              data.player?.id,
              (data.action.payload as PlayCardRequest).card
            );
            break;

          default:
            responseWithoutAction = {
              game: data.game as Game,
              player: data.player,
            };
            gameService.handleInvalidAction();
            break;
        }

        webSocketRoom.sendMessageToRoom(responseWithoutAction.game.id, {
          ...responseWithoutAction,
          action: data.action.type,
        });
      } catch (error) {
        console.error(error);
        console.error("Something went wrong");
      }
    });

    ws.on("close", () => {
      const connectionData = connectionMap.get(ws);

      if (connectionData) {
        const { gameId, playerId } = connectionData;
        webSocketRoom.leaveRoom(ws);
        const responseWithoutAction = gameService.removePlayerFromGame(
          gameId,
          playerId
        );
        connectionMap.delete(ws);
        webSocketRoom.sendMessageToRoom(responseWithoutAction?.game?.id, {
          ...responseWithoutAction,
          action: ACTION.LEAVE_GAME,
        });
      }
    });
  });
};
