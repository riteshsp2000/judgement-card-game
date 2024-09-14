import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import CardImg from "~/components/CardImg";
import { Avatar } from "~/components/ui/avatar";
import { Game } from "~/types";

const HandWinner: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
      {Object.values(
        game.currentRound?.previousHands[
          game.currentRound?.previousHands.length - 1
        ]?.cards || {}
      ).map((cp, index) => {
        const cardPlayer = game.players.filter((p) => p.id === cp.playerId)[0];
        return (
          <div
            key={index}
            className={
              cp.playerId ===
              game.currentRound?.previousHands[
                game.currentRound?.previousHands.length - 1
              ].handWinner.playerId
                ? "border-blue-400 border-4 rounded p-1"
                : ""
            }
          >
            <div className="flex mb-2">
              <Avatar className="w-5 h-5">
                <AvatarImage src={cardPlayer.img} />
                <AvatarFallback>{cardPlayer.name || "RP"}</AvatarFallback>
              </Avatar>
              <h5 className="ml-2 text-sm font-medium">{cardPlayer.name}</h5>
            </div>
            <CardImg card={cp.card} />
          </div>
        );
      })}
    </div>
  );
};

export default HandWinner;
