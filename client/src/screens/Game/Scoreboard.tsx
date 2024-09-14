import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ScoreCard } from "~/hooks/useGameState";

const Scoreboard: React.FC<{ score: ScoreCard }> = ({ score }) => {
  /**
   * show scoreboard,
   * if game just started, show start game component
   */
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3>Scoreboard</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Player</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">✅</TableHead>
              <TableHead className="text-center">❌</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {score.players.map(({ player, score, correct, incorrect }) => (
              <TableRow key={player.id}>
                <TableCell className="flex items-center justify-start gap-2 font-medium">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={player.img} />
                    <AvatarFallback>{player.name[0] || "RP"}</AvatarFallback>
                  </Avatar>
                  {player.name}
                </TableCell>
                <TableCell className="text-center">{score}</TableCell>
                <TableCell className="text-center">{correct}</TableCell>
                <TableCell className="text-center">{incorrect}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
  // return (
  //   <div className="p-4 mt-4 border rounded">
  //     <h1 className="text-lg font-semibold">Show score board here</h1>
  //   </div>
  // );
};

export default Scoreboard;
