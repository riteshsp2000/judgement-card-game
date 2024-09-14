import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Player } from "~/types";

interface PlayerToPlayProps {
  player?: Player;
}

const PlayerToPlay: React.FC<PlayerToPlayProps> = ({ player }) => {
  if (!player) return <></>;

  return (
    <Card className="mt-4">
      <CardContent className="flex gap-2 pt-4 text-sm font-light">
        waiting for player
        <div className="flex items-center justify-start gap-2">
          <Avatar className={cn("w-4 h-4")}>
            <AvatarImage src={player.img} />
            <AvatarFallback>{player.name[0] || "RP"}</AvatarFallback>
          </Avatar>
          <h6 className={cn("font-semibold italic")}>{player.name}</h6>
        </div>
        to play...
      </CardContent>
    </Card>
  );
};

export default PlayerToPlay;
