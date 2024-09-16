import { Player } from "~/dto/player";
import { Game } from "~/dto/game";
import { Card } from "~/dto/card";
import { generatePlayerName } from "~/util/generateId";
import { ERRORS } from "~/constant/error";
import { CustomError } from "~/dto/customError";

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
    const game = this.validateAndGetGame(gameId);
    const player = new Player(generatePlayerName(game.id, gameNames));
    game.addPlayer(player);
    this.games[game.id] = game;
    return { game, player };
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
    if (!playerId) throw new CustomError(ERRORS.PLAYER_NOT_FOUND);
    if (!numberOfHands) throw new CustomError(ERRORS.INVALID_HANDS_CALLED);
    game.callHand(playerId, numberOfHands);
    this.games[game.id] = game;
    return { game };
  }

  playCard(gameId?: string, playerId?: string, card?: Card) {
    const game = this.validateAndGetGame(gameId);
    if (!playerId) throw new CustomError(ERRORS.PLAYER_NOT_FOUND);
    if (!card) throw new CustomError(ERRORS.INVALID_CARD_PLAYED);
    game.playCard(playerId, card);
    this.games[game.id] = game;
    return { game };
  }

  removePlayerFromGame(gameId?: string, playerId?: string) {
    const game = this.validateAndGetGame(gameId);
    if (!playerId) throw new CustomError(ERRORS.PLAYER_NOT_FOUND);
    return { game };
  }

  handleInvalidAction() {}

  validatePlayer(playerId?: string) {
    if (!playerId) throw new CustomError(ERRORS.PLAYER_NOT_FOUND);
  }

  validateAndGetGame(gameId?: string) {
    if (!gameId) {
      throw new CustomError(ERRORS.GAME_NOT_FOUND);
    }

    const game = this.games[gameId];

    if (!Boolean(this.games[game.id])) {
      throw new CustomError(ERRORS.GAME_NOT_FOUND);
    }

    return game;
  }
}
