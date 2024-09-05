import { UsersIcon, XIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "~/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

const PLAYERS = [
  {
    img: "https://avatars.githubusercontent.com/u/124599?v=4",
    name: "U1",
  },
  {
    img: "https://avatars.githubusercontent.com/u/124599?v=4",
    name: "U2",
  },
  {
    img: "https://avatars.githubusercontent.com/u/124599?v=4",
    name: "U3",
  },
];

const Lobby = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleStartGameClick = () => {
    navigate(`/game/play/${params.gameId}`);
  };

  return (
    <Layout
      footer={
        <footer className="p-4">
          <Button className="w-full" onClick={handleStartGameClick}>
            Start Game
          </Button>
        </footer>
      }
    >
      <main className="flex-1 grid grid-cols-1 gap-4 py-4">
        <Card className="bg-card text-card-foreground p-6">
          <div className="flex flex-col items-center justify-center">
            <UsersIcon className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Waiting for players...</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Invite your friends to join the game
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline">Copy Link</Button>
            </div>
          </div>
          <div className="mt-6 pt-6 flex flex-col gap-y-4">
            {PLAYERS.map((p, index) => (
              <>
                {index !== 0 && <Separator />}
                {console.log(index, index !== 0)}
                <div
                  key={p.name}
                  className="flex items-center justify-between "
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={p.img} alt="User 1" />
                      <AvatarFallback>{p.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{p.name}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <XIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="sr-only">Remove player</span>
                  </Button>
                </div>
              </>
            ))}
          </div>
        </Card>
      </main>
    </Layout>
  );
};

export default Lobby;
