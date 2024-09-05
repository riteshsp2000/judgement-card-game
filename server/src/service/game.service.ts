import { Player } from "~/dto/player";
import { Game } from "~/dto/game";
import { Card } from "~/dto/card";

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

  startRound(gameId: string) {
    const game = this.validateAndGetGame(gameId);
    game.startRound();
    this.games[game.id] = game;
    return { game };
  }

  callHand(gameId: string, playerId: string, numberOfHands: number) {
    const game = this.validateAndGetGame(gameId);
    game.callHand(playerId, numberOfHands);
    this.games[game.id] = game;
    return { game };
  }

  playCard(gameId: string, playerId: string, card: Card) {
    const game = this.validateAndGetGame(gameId);
    game.playCard(playerId, card);
    this.games[game.id] = game;
    return { game };
  }

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
