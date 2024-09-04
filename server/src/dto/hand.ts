import { SUIT, TRUMP } from "~/type/card.type";
import { Card } from "~/dto/card";

type ICard = {
  card: Card;
  playerId: string;
};

export class Hand {
  public cards: Record<string, ICard> = {};
  public handWinner: ICard | undefined;

  private trump: TRUMP;
  private firstPlayedSuit: SUIT | undefined;

  private numberOfPlayersPlaying: number | undefined;

  constructor(numberOfPlayersPlaying: number, trump: TRUMP) {
    this.numberOfPlayersPlaying = numberOfPlayersPlaying;
    this.trump = trump;
  }

  addCard(playerId: string, card: Card) {
    if (this.cards[playerId]) {
      throw new Error("UNHANDLED: PLAYER ALREADY PLAYED");
    }

    if (Object.keys(this.cards).length === 0) {
      this.firstPlayedSuit = card.suit;
    }

    this.cards[playerId] = { card, playerId };
  }

  allPlayersPlayed() {
    return Object.keys(this.cards).length === this.numberOfPlayersPlaying;
  }

  determineWinner() {
    if (this.trump !== "NO_TRUMP") {
      const trumpCardsPlayed = this.filterCardsOfSameSuit(this.trump);
      if (trumpCardsPlayed.length > 0) {
        this.handWinner = this.determineHighestCardOfSameSuit(trumpCardsPlayed);
        return;
      }
    }

    const sameSuitCardsPlayed = this.filterCardsOfSameSuit(
      this.firstPlayedSuit as SUIT
    );
    if (sameSuitCardsPlayed.length > 0) {
      this.handWinner =
        this.determineHighestCardOfSameSuit(sameSuitCardsPlayed);
      return;
    }

    console.log("UNHANDLED: no condition satisfied for winner determination");
  }

  private filterCardsOfSameSuit(suit: SUIT) {
    return Object.values(this.cards).filter(({ card }) => card.suit === suit);
  }

  private determineHighestCardOfSameSuit(icards: Array<ICard>) {
    return icards.sort(
      (icard1, icard2) => icard1.card.rank - icard2.card.rank
    )[0];
  }
}
