import { CARD_VALUE, SUITE } from "~/type/card.type";

export class Card {
  private suite: SUITE | undefined;
  private card: CARD_VALUE | undefined;

  constructor(suite: SUITE, card: CARD_VALUE) {
    this.suite = suite;
    this.card = card;
  }
}
