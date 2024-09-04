import { SUIT } from "~/type/card.type";
import { Card } from "~/dto/card";

export class Hand {
  private cards: Array<Card> = [];
  private trump: SUIT = SUIT.SPADE;

  constructor(trump: SUIT) {
    this.trump = trump;
  }
}
