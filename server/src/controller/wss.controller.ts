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
            webSocketRoom.joinRoom(
              responseWithoutAction.game.id,
              responseWithoutAction.player!.id,
              ws
            );
            ws.send(
              JSON.stringify({
                ...responseWithoutAction,
                action: data.action.type,
              })
            );
            responseWithoutAction.player = undefined;
            break;

          case ACTION.JOIN_GAME:
            responseWithoutAction = gameService.joinGame(
              (data.action.payload as JoinGameRequest).gameId
            ) as Response;

            if (!responseWithoutAction?.game?.id) {
              return ws.send(JSON.stringify({ game: null, player: null }));
            }

            webSocketRoom.joinRoom(
              responseWithoutAction.game.id,
              responseWithoutAction.player!.id,
              ws
            );
            ws.send(
              JSON.stringify({
                ...responseWithoutAction,
                action: data.action.type,
              })
            );
            responseWithoutAction.player = undefined;
            break;

          case ACTION.LEAVE_GAME:
            responseWithoutAction = gameService.removePlayerFromGame(
              data.game?.id,
              data.player?.id
            );
            webSocketRoom.leaveRoom(ws);
            gameService.removePlayerFromGame(data.game?.id, data.player?.id);
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
            };
            break;
        }

        webSocketRoom.sendMessageToRoom(responseWithoutAction.game.id, {
          ...responseWithoutAction,
          action: data.action.type,
        });
      } catch (error) {
        console.error(error);
      }
    });

    ws.on("close", () => {
      const connectionData = webSocketRoom.getConnectionDataFromWs(ws);
      console.log(connectionData);

      if (connectionData) {
        const responseWithoutAction = gameService.removePlayerFromGame(
          connectionData.gameId,
          connectionData.playerId
        );

        webSocketRoom.leaveRoom(ws);
        webSocketRoom.deleteConnectionDataByWs(ws);
        webSocketRoom.sendMessageToRoom(connectionData.gameId as string, {
          ...responseWithoutAction,
          action: ACTION.LEAVE_GAME,
        });
      } else {
        console.error("NO CONNECTION DATA FOUND ON CONNECTION CLOSE");
      }
    });
  });
};
