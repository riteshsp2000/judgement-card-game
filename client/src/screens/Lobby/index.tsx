import { UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "~/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { APP_URL } from "~/constants/env";
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
    copyToClipboard(`${APP_URL}?gameId=${game?.id}`);
    const toastId = toast({
      title: "link copied",
      variant: "success",
    });
    setTimeout(() => dismiss(toastId.id), 2000);
  };

  useEffect(() => {
    if (!game || !player) {
      navigate("/game/create");
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
      <main className="flex-1 grid grid-cols-1 gap-4 py-4">
        <Card className="bg-card text-card-foreground p-6">
          <div className="flex flex-col items-center justify-center">
            <UsersIcon className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Waiting for players...</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Invite your friends to join the game
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCopyLinkClick}>
                Copy Link
              </Button>
            </div>
          </div>
          <div className="mt-6 pt-6 flex flex-col gap-y-4">
            {game?.players.map((p, index) => (
              <>
                {index !== 0 && <Separator />}
                <div
                  key={p.name}
                  className="flex items-center justify-between "
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          "https://avatars.githubusercontent.com/u/124599?v=4"
                        }
                        alt="User 1"
                      />
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
