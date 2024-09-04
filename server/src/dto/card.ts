import { RANK, SUIT } from "~/type/card.type";

export class Card {
  public suite: SUIT | undefined;
  public rank: RANK | undefined;

  constructor(suite: SUIT, rank: RANK) {
    this.suite = suite;
    this.rank = rank;
  }
}
