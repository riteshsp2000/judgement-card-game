import { UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "~/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { APP_BASE_URL } from "~/constants/env";
import { useToast } from "~/hooks/use-toast";
import { useGame } from "~/hooks/useGame";
import { useWebSocketConnection } from "~/hooks/useWebSocketConnection";
import { ACTION } from "~/types/action.types";
import { copyToClipboard } from "~/utils/copyToClipboard";

const Lobby = () => {
  const navigate = useNavigate();
  const { game, player } = useGame();
  const ws = useWebSocketConnection();
  const { toast, dismiss } = useToast();

  const handleStartGameClick = () => {
    ws?.sendMessage({
      game,
      player,
      action: {
        type: ACTION.START_GAME,
      },
    });
  };

  const handleCopyLinkClick = () => {
    copyToClipboard(`${APP_BASE_URL}?gameId=${game?.id}`);
    const toastId = toast({
      title: "link copied",
      variant: "success",
    });
    setTimeout(() => dismiss(toastId.id), 2000);
  };

  useEffect(() => {
    if (!game || !player) {
      // navigate("/game/create");
    }
  }, [game, navigate, player]);

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
      <main className="grid flex-1 grid-cols-1 gap-4 py-4">
        <Card className="p-6 bg-card text-card-foreground">
          <div className="flex flex-col items-center justify-center">
            <UsersIcon className="w-12 h-12 mb-4" />
            <h2 className="mb-2 text-2xl font-bold">Waiting for players...</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Invite your friends to join the game
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCopyLinkClick}>
                Copy Link
              </Button>
            </div>
          </div>
          <div className="flex flex-col pt-6 mt-6 gap-y-4">
            {game?.players.map((p, index) => (
              <>
                {index !== 0 && <Separator />}
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
