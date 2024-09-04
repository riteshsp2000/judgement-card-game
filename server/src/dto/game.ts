import { GAME_STATUS } from "~/type/game.type";
import { generateGameId } from "~/util/generateId";
import { Card } from "~/dto/card";
import { Player } from "~/dto/player";
import { SUIT } from "~/type/card.type";
import { Round } from "./round";

export class Game {
  public id: string = generateGameId();
  public players: Array<Player> = [];

  private maxPlayers = 4;
  private minPlayers = 2;
  private numberOfCardsToDeal = 7;

  public status: GAME_STATUS = GAME_STATUS.CREATED;

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
    if (this.currentRound) {
      this.rounds.push(this.currentRound);
      this.currentRound = undefined;
    }

    this.currentRound = new Round(
      this.players,
      this.numberOfCardsToDeal,
      this.determineTrumpForTheRound(),
      this.determinePlayerToPlay()
    );
  }

  callHand(playerId: string, numberOfHands: number) {
    this.validatePlayerToPlay(playerId);
    this.currentRound?.callNumberOfHands(playerId, numberOfHands);
  }

  playCard(playerId: string, card: Card) {
    this.currentRound?.playCard(playerId, card);

    // current hand length === 0
    // initialise a new hand
    //
    // push the card to the hand
    // remove the card from the user's dealt cards
    //
    // current hand lenght === players length
    // determine winner and broadcast winner
    // end round
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
    const remainder = this.rounds.length % this.players.length;
    let returnValue = 0;
    for (let i = 0; i < this.players.length; i++) {
      if (remainder === i) {
        returnValue = remainder;
      }
    }
    return returnValue;
  }
}
