import { GAME_STATUS } from "~/type/game.type";
import { generateGameId } from "~/util/generateId";
import { Card } from "~/dto/card";
import { Hand } from "~/dto/hand";
import { Player } from "~/dto/player";
import { Deck } from "./deck";

export class Game {
  public id: string = generateGameId();
  public players: Array<Player> = [];

  private maxPlayers = 4;
  private minPlayers = 2;
  private maxHands = 7;

  public currentHand: Array<Hand> = [];
  public previousHand: Record<string, Array<Hand>> = {};
  public score: Record<string, Array<number>> = {};
  public dealtCards: Record<string, Array<Card>> = {};
  public status: GAME_STATUS = GAME_STATUS.CREATED;
  public playerToStart = 0;

  constructor() {}

  canAddPlayer() {
    return (
      this.players.length < this.maxPlayers &&
      this.status === GAME_STATUS.CREATED
    );
  }

  addPlayer(player: Player) {
    if (this.canAddPlayer()) {
      this.players.push(player);
    }
  }

  canStartGame() {
    return (
      this.players.length >= this.minPlayers &&
      this.players.length <= this.maxPlayers
    );
  }

  startGame() {
    if (!this.canStartGame()) {
      throw new Error(
        "UNHANDLED: Cannot start the game (min max players check)"
      );
    }

    this.status = GAME_STATUS.STARTED;
  }

  startRound() {
    const deck = new Deck();

    this.players.forEach((player) => {
      if (!this.dealtCards[player.id]) {
        this.dealtCards[player.id] = [];
      }

      this.dealtCards[player.id] = deck.dealCards(this.maxHands);
    });
  }
}
