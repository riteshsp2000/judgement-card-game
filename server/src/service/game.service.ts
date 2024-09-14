import { Player } from "~/dto/player";
import { Game } from "~/dto/game";
import { Card } from "~/dto/card";
import { generatePlayerName } from "~/util/generateId";

// Temporary naming service;
const gameNames = new Map<string, Array<{ name: string; img: string }>>();

export class GameService {
  private games: Record<string, Game>;

  constructor() {
    this.games = {};
  }

  createGame() {
    const game = new Game();
    const player = new Player(generatePlayerName(game.id, gameNames));

    game.addPlayer(player);
    this.games[game.id] = game;
    return { game, player };
  }

  joinGame(gameId?: string) {
    try {
      const game = this.validateAndGetGame(gameId);

      const player = new Player(generatePlayerName(game.id, gameNames));
      game.players.push(player);
      this.games[game.id] = game;
      return { game, player };
    } catch (e) {
      return {};
    }
  }

  startGame(gameId?: string) {
    const game = this.validateAndGetGame(gameId);
    game.startGame();
    this.games[game.id] = game;
    return { game };
  }

  startRound(gameId?: string) {
    const game = this.validateAndGetGame(gameId);
    game.startRound();
    this.games[game.id] = game;
    return { game };
  }

  callHand(gameId?: string, playerId?: string, numberOfHands?: number) {
    const game = this.validateAndGetGame(gameId);
    if (!playerId) throw new Error("Player ID not found");
    if (!numberOfHands) throw new Error("Number of hands not found");
    game.callHand(playerId, numberOfHands);
    this.games[game.id] = game;
    return { game };
  }

  playCard(gameId?: string, playerId?: string, card?: Card) {
    const game = this.validateAndGetGame(gameId);
    if (!playerId) throw new Error("Player ID not found");
    if (!card) throw new Error("Played card not found");
    game.playCard(playerId, card);
    this.games[game.id] = game;
    return { game };
  }

  removePlayerFromGame(gameId?: string, playerId?: string) {
    const game = this.validateAndGetGame(gameId);
    if (!playerId) throw new Error("Player ID not found");
    game.removePlayer(playerId);
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
