import { WebSocket } from "ws";
import { GameService } from "./game";

export class WsService {
  private ws: WebSocket;
  private gameService: GameService;

  constructor(ws: WebSocket) {
    this.ws = ws;
    this.gameService = new GameService();
  }

  async handleMessage(message: string) {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case "CREATE_GAME":
          this.gameService.createGame();
          break;

        case "JOIN_GAME":
          this.gameService.joinGame();
          break;

        case "START_GAME":
          this.gameService.startGame();
          break;

        case "START_ROUND":
          this.gameService.startRound();
          break;

        case "PLAY_CARD":
          this.gameService.playCard();
          break;

        default:
          this.gameService.handleInvalidAction();
          break;
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  }

  handleClose() {
    console.log("CONNECTION CLOSED");
  }

  handleError() {
    console.log("CONNECTION CLOSED");
  }

  handleOpen() {
    console.log("CONNECTION CLOSED");
  }
}
