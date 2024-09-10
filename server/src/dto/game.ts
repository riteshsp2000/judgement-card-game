import { GAME_STATUS } from "~/type/game.type";
import { generateGameId } from "~/util/generateId";
import { Card } from "~/dto/card";
import { Player } from "~/dto/player";
import { SUIT } from "~/type/card.type";
import { Round } from "./round";

export class Game {
  public id: string = generateGameId();
  public players: Array<Player> = [];

  /* GAME CONFIGURATIONS */
  private maxPlayers = 4;
  private minPlayers = 2;
  private numberOfCardsToDeal = 7;

  /* GAME STATES */
  public status: GAME_STATUS = GAME_STATUS.CREATED;
  public playerToPlay = 0;

  public currentRound: Round | undefined;
  public rounds: Array<Round> = [];
  public score: Record<string, number> = {};

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
    /**
     * start round can be called only when previous
     * round is complete, (add check)
     *
     * when called, update the current hand state
     */
    if (this.currentRound) {
      this.rounds.push(this.currentRound);
      this.currentRound = undefined;
    }

    this.currentRound = new Round(
      this.players,
      this.numberOfCardsToDeal,
      this.determineTrumpForTheRound()
    );
  }

  callHand(playerId: string, numberOfHands: number) {
    this.validatePlayerToPlay(playerId);
    this.currentRound?.callNumberOfHands(playerId, numberOfHands);
    this.playerToPlay = this.determinePlayerToPlay();
  }

  playCard(playerId: string, card: Card) {
    this.validatePlayerToPlay(playerId);
    this.currentRound?.playCard(playerId, card);
    this.playerToPlay = this.determinePlayerToPlay();

    if (this.currentRound?.hasRoundEnded()) {
      this.updatePoints();
      this.startNextRound();
    }

    if (this.hasGameEnded()) {
      this.status = GAME_STATUS.COMPLETED;
    }
  }

  removePlayer(playerId: string) {
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  private startNextRound() {
    if (this.currentRound) {
      this.rounds.push(this.currentRound);
      this.currentRound = undefined;
    }
  }

  private updatePoints() {
    this.players.forEach((p) => {
      if (typeof this.score[p.id] === "undefined") {
        this.score[p.id] = 0;
      }

      if (this.currentRound) {
        if (this.currentRound.hasPlayerMadeCalledNumberOfHands(p.id)) {
          this.score[p.id] =
            this.score[p.id] + this.currentRound.numberOfHandsCalled[p.id];
        } else {
          this.score[p.id] =
            this.score[p.id] - this.currentRound.numberOfHandsCalled[p.id];
        }
      }
    });
  }

  private validatePlayerToPlay(playerId: string) {
    if (!playerId) {
      throw new Error("UNHANDLED: PLAYER ID NOT FOUND");
    }

    if (!this.players.some((p) => p.id === playerId)) {
      throw new Error("UNHANDLED: PLAYER NOT FOUND");
    }
  }

  private determineTrumpForTheRound() {
    const remainder = this.rounds.length % 5;
    switch (remainder) {
      case 0:
        return SUIT.SPADE;
      case 1:
        return SUIT.HEART;
      case 2:
        return SUIT.CLUB;
      case 3:
        return SUIT.DIAMOND;
      case 4:
      default:
        return "NO_TRUMP";
    }
  }

  private determinePlayerToPlay() {
    /* Player to start the hand */
    if (this.currentRound) {
      const previousHandWinnerId = this.currentRound.getPreviousHandWinner();
      if (previousHandWinnerId) {
        return this.players.findIndex((p) => p.id === previousHandWinnerId);
      } else {
        return 0;
      }
    }

    /* Player to start the round */
    const remainder = this.rounds.length % this.players.length;
    let returnValue = 0;
    for (let i = 0; i < this.players.length; i++) {
      if (remainder === i) {
        returnValue = remainder;
      }
    }
    return returnValue;
  }

  private hasGameEnded() {
    return this.rounds.length === 5;
  }
}
