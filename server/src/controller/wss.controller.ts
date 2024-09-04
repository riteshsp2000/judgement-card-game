import { WebSocketServer } from "ws";
import { JoinGameRequest, Request } from "~/type/action.type";
import { GameService } from "~/service/game.service";

const gameService = new GameService();

export const wssController = (wss: WebSocketServer) => {
  wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
      try {
        const data: Request = JSON.parse(message.toString());

        switch (data.action.type) {
          case "CREATE_GAME":
            ws.send(JSON.stringify(gameService.createGame()));
            break;

          case "JOIN_GAME":
            ws.send(
              JSON.stringify(
                gameService.joinGame(
                  (data.action.payload as JoinGameRequest).gameId
                )
              )
            );
            break;

          case "START_GAME":
            gameService.startGame();
            break;

          case "START_ROUND":
            gameService.startRound();
            break;

          case "PLAY_CARD":
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
