import { PlusIcon, UsersIcon } from "lucide-react";
import { useState } from "react";

import FullPageLoader from "~/components/FullPageLoader";
import JoinGameDrawer from "~/components/JoinGameDrawer";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useWebSocketConnection } from "~/hooks/useWebSocketConnection";
import { ACTION } from "~/types/action.types";

const CreateGame = () => {
  const ws = useWebSocketConnection();

  const [loading] = useState(false);
  const [showJoinGameDrawer, setShowJoinGameDrawer] = useState(false);

  const handleCreateGameClick = () => {
    ws?.sendMessage({
      action: {
        type: ACTION.CREATE_GAME,
      },
    });
  };

  const handleJoinGameClick = () => {
    setShowJoinGameDrawer(true);
  };

  if (loading) return <FullPageLoader />;
  return (
    <Layout>
      <main className="flex-1 grid grid-cols-1 gap-4 py-4">
        <Card
          className="bg-card text-card-foreground flex flex-col justify-center items-center p-6"
          onClick={handleCreateGameClick}
        >
          <PlusIcon className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">New Game</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Start a new game of Judgement
          </p>
          <Button>Create Game</Button>
        </Card>

        <Card
          className="bg-card text-card-foreground flex flex-col justify-center items-center p-6"
          onClick={handleJoinGameClick}
        >
          <UsersIcon className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Lobby</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Join an existing game of Judgement
          </p>
          <Button>Join Game</Button>
        </Card>
      </main>

      <JoinGameDrawer
        onClose={() => setShowJoinGameDrawer(false)}
        open={showJoinGameDrawer}
      />
    </Layout>
  );
};

export default CreateGame;
