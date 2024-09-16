import { RANK, SUIT } from "~/type/card.type";
import { Card } from "./card";
import { CustomError } from "./customError";
import { ERRORS } from "~/constant/error";

export class Deck {
  private suits: SUIT[] = Object.values(SUIT);
  private ranks: RANK[] = Array.from({ length: 13 }, (_, i) => (i + 2) as RANK);
  private deck: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck(): void {
    this.deck = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.deck.push(new Card(suit, rank));
      }
    }
  }

  // Shuffle the deck using Fisher-Yates algorithm
  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // Generate and deal a specified number of cards
  dealCards(numCards: number): Card[] {
    if (numCards > this.deck.length) {
      throw new CustomError(ERRORS.NOT_ENOUGH_CARDS);
    }

    this.shuffleDeck();

    const dealtCards = this.deck.slice(0, numCards);
    this.deck = this.deck.slice(numCards); // Remove dealt cards from the deck

    return dealtCards;
  }

  // Optional: Reset the deck
  resetDeck(): void {
    this.initializeDeck();
    this.shuffleDeck();
  }
}
