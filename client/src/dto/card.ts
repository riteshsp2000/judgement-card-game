export enum SUIT {
  SPADE = "SPADE",
  CLUB = "CLUB",
  HEART = "HEART",
  DIAMOND = "DIAMOND",
}

export type RANK = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type TRUMP = SUIT | "NO_TRUMP";

const rankToAssetNameMapping: Record<string, string> = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "jack",
  12: "queen",
  13: "king",
  14: "ace",
};

export class Card {
  public suit: SUIT;
  public rank: RANK;
  public img?: string;

  constructor(card: Card) {
    this.suit = card.suit;
    this.rank = card.rank;

    this.img = `/assets/cards/${
      rankToAssetNameMapping[card.rank.toString()]
    }_of_${card.suit.toLowerCase()}s.svg`;
  }
}
