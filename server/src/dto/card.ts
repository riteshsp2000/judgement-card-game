export enum SUITE {
  SPADE = "SPADE",
  CLUB = "CLUB",
  HEART = "HEART",
  DIAMOND = "DIAMOND",
}

export type CARD_VALUE = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export class Card {
  private suite: SUITE | undefined;
  private card: CARD_VALUE | undefined;

  constructor(suite: SUITE, card: CARD_VALUE) {
    this.suite = suite;
    this.card = card;
  }
}
