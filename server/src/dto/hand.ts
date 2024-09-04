import { Card, SUITE } from "./card";

export class Hand {
  private cards: Array<Card> = [];
  private trump: SUITE = SUITE.SPADE;

  constructor(trump: SUITE) {
    this.trump = trump;
  }
}
