import React from "react";
import CardImg from "~/components/CardImg";

import { Card } from "~/dto/card";

import { Game, Player } from "~/types";

const DealtCards: React.FC<{
  game: Game;
  player: Player;
  onCardClick: (card: Card) => void;
}> = (props) => {
  return (
    <div className="w-full px-4 py-2 bg-[#35654d] flex gap-3 items-start overflow-x-auto whitespace-nowrap">
      {props.game.currentRound?.cardsDealt[props.player.id]
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
