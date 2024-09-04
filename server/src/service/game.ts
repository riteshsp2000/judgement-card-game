import { Player } from "../dto/player";
import { Game } from "../dto/game";

export class GameService {
  private games: Record<string, Game>;

  constructor() {
    this.games = {};
  }

  createGame() {
    const player = new Player();
    const game = new Game();

    game.addPlayer(player);
    this.games[game.id] = game;
    return { game, player };
  }

  joinGame(gameId?: string) {
    if (!gameId) {
      throw new Error("UNHANDLED: No game ID found");
    }

    const game = this.games[gameId];

    if (!this.doesGameExist(game)) {
      throw new Error("UNHANDLED: Game does not exist");
    }

    if (!game.canAddPlayer()) {
      throw new Error("UNHANDLED: Max number of players in the game");
    }

    const player = new Player();
    game.players.push(player);
    this.games[game.id] = game;
    return { game, player };
  }

  startGame() {}

  startRound() {}

  playCard() {}

  handleInvalidAction() {}

  doesGameExist(game: Game) {
    return Boolean(this.games[game.id]);
  }
}
