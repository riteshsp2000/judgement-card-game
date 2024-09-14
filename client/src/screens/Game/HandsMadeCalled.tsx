import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Hands } from "~/hooks/useGameState";

interface HandsMadeCalledProps {
  showHandsCalled?: boolean;
  handsMadeCalled?: Hands;
}

const HandsMadeCalled: React.FC<HandsMadeCalledProps> = ({
  showHandsCalled,
  handsMadeCalled,
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3>Hands made {showHandsCalled && "and Called"}</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Player</TableHead>
              <TableHead className="text-center">Hands Called</TableHead>
              <TableHead className="text-center">Hands Made</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {handsMadeCalled?.players.map(
              ({ player, handsCalled, handsMade }) => (
                <TableRow key={player.id}>
                  <TableCell className="flex items-center justify-start gap-2 font-medium">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={player.img} />
                      <AvatarFallback>{player.name[0] || "RP"}</AvatarFallback>
                    </Avatar>
                    {player.name}
                  </TableCell>
                  <TableCell className="text-center">{handsCalled}</TableCell>
                  <TableCell className="text-center">{handsMade}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HandsMadeCalled;
