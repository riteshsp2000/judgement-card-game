import { Player } from "~/dto/player";
import { Game } from "~/dto/game";

export class GameService {
  private games: Record<string, Game>;

  constructor() {
    this.games = {};
  }

  createGame() {
    // TODO: don't allow same user to create a new game if
    // in existing game
    const player = new Player();
    const game = new Game();

    game.addPlayer(player);
    this.games[game.id] = game;
    return { game, player };
  }

  joinGame(gameId?: string) {
    const game = this.validateAndGetGame(gameId);

    const player = new Player();
    game.players.push(player);
    this.games[game.id] = game;
    return { game, player };
  }

  startGame(gameId: string) {
    const game = this.validateAndGetGame(gameId);
    game.startGame();
    this.games[game.id] = game;
    return { game };
  }

  startRound() {}

  playCard() {}

  handleInvalidAction() {}

  validateAndGetGame(gameId?: string) {
    if (!gameId) {
      throw new Error("UNHANDLED: No game ID found");
    }

    const game = this.games[gameId];

    if (!Boolean(this.games[game.id])) {
      throw new Error("UNHANDLED: Game does not exist");
    }

    return game;
  }
}
