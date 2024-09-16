import { Outlet, useNavigate } from "react-router-dom";
import { WS_BASE_URL } from "~/constants/env";
import { WebSocketConnectionProvider } from "~/contexts/WebSocketConnectionProvider";
import { useToast } from "~/hooks/use-toast";
import { useGame } from "~/hooks/useGame";
import useWebSocket from "~/hooks/useWebSocket";
import { WebSocketErrorResponse, WebSocketResponse } from "~/types";
import { ACTION } from "~/types/action.types";

const AppInitialiser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setGame } = useGame();

  const webSocket = useWebSocket<WebSocketResponse>({
    url: WS_BASE_URL,
    onMessage: (data) => {
      if (data.action === "ERROR") {
        toast({
          title: (data as WebSocketErrorResponse).payload.message,
          variant: "destructive",
        });
        return;
      }

      if (data.action && Object.values(ACTION).includes(data.action)) {
        setGame((current) => ({
          game: data.game,
          action: data.action,
          player: current.player || data.player,
        }));

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
            toast({
              title: `Player - left the game`,
              variant: "destructive",
            });
            break;
          }
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
