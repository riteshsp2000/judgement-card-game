import React from "react";
import CardImg from "~/components/CardImg";

import { Card } from "~/dto/card";

import { Game, Player } from "~/types";

// Define the suit order
const suitOrder = { SPADE: 1, HEART: 2, CLUB: 3, DIAMOND: 4 };

const DealtCards: React.FC<{
  game: Game;
  player: Player;
  onCardClick: (card: Card) => void;
}> = (props) => {
  return (
    <div className="w-full px-4 py-2 bg-[#35654d] flex gap-3 items-start overflow-x-auto whitespace-nowrap">
      {props.game.currentRound?.cardsDealt[props.player.id]
        .sort((a, b) => {
          // Compare suits first using the predefined suitOrder
          if (suitOrder[a.suit] !== suitOrder[b.suit]) {
            return suitOrder[a.suit] - suitOrder[b.suit];
          }

          // If suits are the same, compare by rank in descending order
          return b.rank - a.rank;
        })
        .map((c) => new Card(c))
        .map((card, index) => (
          <div
            className="flex-shrink-0"
            key={index}
            onClick={() => props.onCardClick(card)}
          >
            <CardImg card={card} />
          </div>
        )) || (
        <h2 className="text-lg font-bold text-center">
          please click on{" "}
          <i>
            <b>roundon</b>
          </i>{" "}
          to start the round
        </h2>
      )}
    </div>
  );
};

export default DealtCards;
