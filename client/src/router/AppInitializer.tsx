import { Outlet, useNavigate } from "react-router-dom";
import { WS_API_BASE_URL } from "~/constants/env";
import { WebSocketConnectionProvider } from "~/contexts/WebSocketConnectionProvider";
import { useToast } from "~/hooks/use-toast";
import { useGame } from "~/hooks/useGame";
import useWebSocket from "~/hooks/useWebSocket";
import { WebSocketResponse } from "~/types";
import { ACTION } from "~/types/action.types";

const AppInitialiser = () => {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  const { game, player, setGame, action } = useGame();

  const webSocket = useWebSocket<WebSocketResponse>({
    url: WS_API_BASE_URL,
    onMessage: (data) => {
      const stateToBeSet = { game, player, action };
      if (data.game) stateToBeSet.game = data.game;
      if (data.player) stateToBeSet.player = data.player;
      if (data.action) stateToBeSet.action = data.action;
      setGame(stateToBeSet);

      switch (data.action) {
        case ACTION.CREATE_GAME:
          navigate(`/game/lobby/${data.game?.id}`);
          break;

        case ACTION.JOIN_GAME:
          navigate(`/game/lobby/${data.game?.id}`);
          break;

        case ACTION.START_GAME:
          navigate(`/game/play/${data.game?.id}`);
          break;

        case ACTION.LEAVE_GAME: {
          const toastId = toast({
            title: `Player - left the game`,
            variant: "destructive",
          });
          setTimeout(() => dismiss(toastId.id), 2000);
          break;
        }
      }
    },
  });

  return (
    <WebSocketConnectionProvider webSocket={webSocket}>
      <Outlet />
    </WebSocketConnectionProvider>
  );
};

export default AppInitialiser;
