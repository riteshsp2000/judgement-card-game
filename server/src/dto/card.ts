import { RANK, SUIT } from "~/type/card.type";

export class Card {
  public suit: SUIT;
  public rank: RANK;

  constructor(suit: SUIT, rank: RANK) {
    this.suit = suit;
    this.rank = rank;
  }
}
