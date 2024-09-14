import {
  Trophy,
  Spade,
  Heart,
  Club,
  Diamond,
  Ban,
  CirclePlay,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Game, Player } from "~/types";

const SUIT_TO_ICON_MAPPING = {
  SPADE: <Spade />,
  HEART: <Heart />,
  CLUB: <Club />,
  DIAMOND: <Diamond />,
  NO_TRUMP: <Ban />,
};

interface TabProps {
  onStartRoundClick: () => void;
  game: Game;
  player: Player;
}

const Tabs: React.FC<TabProps> = ({ onStartRoundClick, game, player }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <div className="flex flex-col items-center justify-center flex-1 px-2 py-4 border rounded aspect-square">
        <Avatar className={"w-6 h-6"}>
          <AvatarImage src={player.img} />
          <AvatarFallback>{player.name[0] || "RP"}</AvatarFallback>
        </Avatar>
        <h3 className="mt-2 text-xs font-light">{player.name}</h3>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-2 py-4 border rounded aspect-square">
        {SUIT_TO_ICON_MAPPING[game?.currentRound?.trump || "SPADE"]}
        <h3 className="mt-2 text-xs font-light">trump</h3>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-2 py-4 border rounded aspect-square">
        <Trophy />
        <h3 className="mt-2 text-xs font-light">stats</h3>
      </div>

      <div
        onClick={onStartRoundClick}
        className="flex flex-col items-center justify-center flex-1 px-2 py-4 border rounded aspect-square"
      >
        <CirclePlay />
        <h3 className="mt-2 text-xs font-light">roundon</h3>
      </div>
    </div>
  );
};

export default Tabs;
