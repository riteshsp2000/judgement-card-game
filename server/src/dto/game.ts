import { GAME_STATUS } from "~/type/game.type";
import { generateGameId } from "~/util/generateId";
import { Card } from "~/dto/card";
import { Player } from "~/dto/player";
import { SUIT } from "~/type/card.type";
import { Round } from "./round";
import { ERRORS } from "~/constant/error";
import { CustomError } from "./customError";

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

  constructor(game?: Game) {
    if (game) {
      this.id = game.id;
      this.players = game.players;
      this.maxPlayers = game.maxPlayers;
      this.minPlayers = game.minPlayers;
      this.numberOfCardsToDeal = game.numberOfCardsToDeal;
      this.status = game.status;
      this.playerToPlay = game.playerToPlay;
      this.currentRound = game.currentRound
        ? new Round(game.currentRound)
        : undefined;
      this.rounds = game.rounds;
      this.score = game.score;

      this.canAddPlayer.bind(this);
      this.addPlayer.bind(this);
      this.canStartGame.bind(this);
      this.startGame.bind(this);
      this.startRound.bind(this);
      this.callHand.bind(this);
      this.playCard.bind(this);
      this.removePlayer.bind(this);
      this.startNextRound.bind(this);
      this.updatePoints.bind(this);
      this.validatePlayerToPlay.bind(this);
      this.determineTrumpForTheRound.bind(this);
      this.determinePlayerToPlay.bind(this);
      this.hasGameEnded.bind(this);
    }
  }

  canAddPlayer() {
    return (
      this.players.length < this.maxPlayers &&
      this.status === GAME_STATUS.CREATED
    );
  }

  addPlayer(player: Player) {
    if (this.canAddPlayer()) {
      this.players.push(player);
    } else {
      throw new CustomError(ERRORS.GAME_FULL);
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
      throw new CustomError(ERRORS.CANNOT_START_GAME);
    }

    if (this.status !== GAME_STATUS.CREATED) {
      throw new CustomError(ERRORS.CANNOT_START_GAME);
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
      if (!this.currentRound.isRoundComplete()) {
        throw new CustomError(ERRORS.ROUND_IN_PROGRESS);
      }

      this.rounds.push(this.currentRound);
      this.currentRound = undefined;
    }

    this.currentRound = new Round(
      undefined,
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
      throw new CustomError(ERRORS.PLAYER_NOT_FOUND);
    }

    if (this.players.map((p) => p.id).indexOf(playerId) !== this.playerToPlay) {
      throw new CustomError(ERRORS.INVALID_PLAYER_PLAYING);
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
    /* Next player after number of hands called */
    if (
      this.currentRound &&
      Object.keys(this.currentRound.numberOfHandsCalled).length <
        this.players.length
    ) {
      const numberOfHandsCalled = Object.keys(
        this.currentRound.numberOfHandsCalled
      ).length;
      return (this.playerToPlay + numberOfHandsCalled) % this.players.length;
    }

    /* Next player after currently played (card) */
    if (this.currentRound && this.currentRound.currentHand) {
      const numberOfPlayersPlayed = Object.keys(
        this.currentRound.currentHand.cards
      ).length;

      return (this.playerToPlay + numberOfPlayersPlayed) % this.players.length;
    }

    /* Player to start the hand */
    if (this.currentRound && !this.currentRound.currentHand) {
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
