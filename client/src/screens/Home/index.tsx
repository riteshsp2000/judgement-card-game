import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FullPageLoader from "~/components/FullPageLoader";
import { useWebSocketConnection } from "~/hooks/useWebSocketConnection";
import { ACTION } from "~/types/action.types";

const Home = () => {
  const [searchParams] = useSearchParams();
  const ws = useWebSocketConnection();

  useEffect(() => {
    const gameId = searchParams.get("gameId");
    if (gameId && ws?.isConnected) {
      ws.sendMessage({
        action: {
          type: ACTION.JOIN_GAME,
          payload: {
            gameId: gameId,
          },
        },
      });
    }
  }, [searchParams, ws]);

  return <FullPageLoader />;
};

export default Home;
