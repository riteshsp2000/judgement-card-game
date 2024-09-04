import { generateRoundId } from "~/util/generateId";
import { Hand } from "./hand";
import { Card } from "./card";
import { Player } from "./player";
import { Deck } from "./deck";
import { SUIT, TRUMP } from "~/type/card.type";

export class Round {
  public id = generateRoundId();

  private trump: TRUMP;
  private numberOfCardsDealt: number | undefined;

  private currentHand: Hand | undefined;
  private previousHands: Array<Hand> = [];

  private cardsDealt: Record<string, Array<Card>> = {};
  public playerToPlay: number = 0;
  private numberOfPlayersPlaying: number = 0;

  private numberOfHandsCalled: Record<string, number> = {};
  private scores: Record<string, number> = {};

  constructor(
    players: Array<Player>,
    numberOfCardsToDeal: number,
    trump: TRUMP,
    playerToPlay: number
  ) {
    this.trump = trump;
    this.numberOfCardsDealt = numberOfCardsToDeal;
    this.playerToPlay = playerToPlay;
    this.numberOfPlayersPlaying = players.length;

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
      throw new Error("UNHANDLED: NUMBER OF HANDS ALREADY CALLED");
    }

    this.numberOfHandsCalled[playerId] = numberOfHands;
  }

  playCard(playerId: string, card: Card) {
    this.validatePlayedCard(playerId, card);

    if (!this.currentHand) {
      this.currentHand = new Hand(this.numberOfPlayersPlaying, this.trump);
    }

    this.currentHand.addCard(playerId, card);

    if (this.currentHand.allPlayersPlayed()) {
      this.currentHand.determineWinner();
    }
  }

  startNextHand() {
    if (this.currentHand) {
      this.previousHands.push(this.currentHand);
      this.currentHand = undefined;
    }
  }

  private validatePlayedCard(playerId: string, card: Card) {
    // Validate if the player has the card that is played
    if (
      !this.cardsDealt[playerId].some(
        (c) => c.rank === card.rank && c.suit === card.suit
      )
    ) {
      throw new Error("UNHANDLED: PLAYER DOES NOT HAVE THE CARD");
    }

    // TODO: check the suit and other corresponding logic
  }
}

// const r = new Round([{id: 'adf'}], 7, SUIT.SPADE, 0);
// r.playerToPlay
