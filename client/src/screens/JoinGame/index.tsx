import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FullPageLoader from "~/components/FullPageLoader";
import { useGame } from "~/hooks/useGame";
import { useWebSocketConnection } from "~/hooks/useWebSocketConnection";
import { ACTION } from "~/types/action.types";

const Home = () => {
  const [searchParams] = useSearchParams();
  const ws = useWebSocketConnection();
  const { game, player, action } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    const gameId = searchParams.get("gameId");
    if (gameId && ws?.isConnected && action !== ACTION.JOIN_GAME) {
      ws.sendMessage({
        action: {
          type: ACTION.JOIN_GAME,
          payload: {
            gameId: gameId,
          },
        },
      });
    }
  }, [action, searchParams, ws]);

  useEffect(() => {
    if (!game && !player && action === ACTION.JOIN_GAME) {
      navigate(`/game/create`);
    }
  }, [action, game, navigate, player]);

  return <FullPageLoader />;
};

export default Home;
