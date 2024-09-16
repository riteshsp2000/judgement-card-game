import { generateRoundId } from "~/util/generateId";
import { Hand } from "./hand";
import { Card } from "./card";
import { Player } from "./player";
import { Deck } from "./deck";
import { SUIT, TRUMP } from "~/type/card.type";
import { CustomError } from "./customError";
import { ERRORS } from "~/constant/error";

export class Round {
  public id = generateRoundId();

  private trump: TRUMP;

  public currentHand: Hand | undefined;
  private previousHands: Array<Hand> = [];

  private numberOfCardsToDeal: number;
  private cardsDealt: Record<string, Array<Card>> = {};
  private numberOfPlayersPlaying: number = 0;

  public numberOfHandsCalled: Record<string, number> = {};
  public numberOfHandsMade: Record<string, number> = {};

  constructor(
    players: Array<Player>,
    numberOfCardsToDeal: number,
    trump: TRUMP
  ) {
    this.trump = trump;
    this.numberOfPlayersPlaying = players.length;
    this.numberOfCardsToDeal = numberOfCardsToDeal;

    this.initialiseRound(players, numberOfCardsToDeal);
  }

  initialiseRound(players: Array<Player>, numberOfCardsToDeal: number) {
    const deck = new Deck();

    players.forEach((player) => {
      if (!this.cardsDealt[player.id]) {
        this.cardsDealt[player.id] = [];
      }

      this.cardsDealt[player.id] = deck.dealCards(numberOfCardsToDeal);
    });
  }

  callNumberOfHands(playerId: string, numberOfHands: number) {
    if (typeof this.numberOfHandsCalled[playerId] === "number") {
      throw new CustomError(ERRORS.HANDS_ALREADY_CALLED);
    }

    this.numberOfHandsCalled[playerId] = numberOfHands;
  }

  playCard(playerId: string, card: Card) {
    /**
     * check if all players have called number of hands
     * check if player has that card
     * check if player can play that card
     *
     * if first card played, create a new hand
     *
     * add card to the hand
     * update player to play
     *
     * if last card played,
     * determine the winner
     * update points
     * update player to play
     */

    if (!this.allPlayersCalledHands())
      throw new CustomError(ERRORS.HANDS_NOT_CALLED);

    if (!this.playerHasCard(playerId, card))
      throw new CustomError(ERRORS.PLAYER_HAS_NO_CARD);

    if (!this.playerHasPlayedValidCard(playerId, card))
      throw new CustomError(ERRORS.PLAYER_HAS_NO_VALID_CARD);

    if (!this.currentHand) {
      this.currentHand = new Hand(this.numberOfPlayersPlaying, this.trump);
    }

    this.currentHand.addCard(playerId, card);
    this.removePlayedCard(playerId, card);

    if (this.currentHand.allPlayersPlayed()) {
      this.currentHand.determineWinner();
      this.incrementHandsMade();
      this.startNextHand();
    }
  }

  hasRoundEnded() {
    return this.previousHands.length === this.numberOfCardsToDeal;
  }

  private removePlayedCard(playerId: string, card: Card) {
    this.cardsDealt[playerId] = this.cardsDealt[playerId].filter(
      (c) => c.suit !== card.suit || c.rank !== card.rank
    );
  }

  private incrementHandsMade() {
    const playerId = this.currentHand?.handWinner?.playerId;
    if (!playerId) throw new CustomError(ERRORS.PLAYER_NOT_FOUND);

    if (!this.numberOfHandsMade[playerId]) {
      this.numberOfHandsMade[playerId] = 0;
    }

    this.numberOfHandsMade[playerId] = this.numberOfHandsMade[playerId] + 1;
  }

  private startNextHand() {
    if (this.currentHand) {
      this.previousHands.push(this.currentHand);
      this.currentHand = undefined;
    }
  }

  public allPlayersCalledHands() {
    return (
      Object.keys(this.numberOfHandsCalled).length ===
      this.numberOfPlayersPlaying
    );
  }

  private playerHasCard(playerId: string, card: Card) {
    return this.cardsDealt[playerId].some(
      (c) => c.suit === card.suit && c.rank === card.rank
    );
  }

  private playerHasPlayedValidCard(playerId: string, card: Card) {
    // played card is that of same suit
    if (this.currentHand?.firstPlayedSuit === card.suit) {
      return true;
    }

    // played card is trump
    if (this.trump === card.suit) {
      return true;
    }

    // player does not have same suit card
    if (
      !this.cardsDealt[playerId].some(
        (c) => c.suit === this.currentHand?.firstPlayedSuit
      )
    ) {
      return true;
    }

    return false;
  }

  hasPlayerMadeCalledNumberOfHands(playerId: string) {
    return (
      this.numberOfHandsCalled[playerId] === this.numberOfHandsMade[playerId]
    );
  }

  getPreviousHandWinner() {
    if (this.previousHands.length > 0) {
      return this.previousHands[this.previousHands.length - 1].handWinner
        ?.playerId;
    } else {
      return null;
    }
  }

  isRoundComplete() {
    return this.previousHands.length === this.numberOfCardsToDeal;
  }
}
