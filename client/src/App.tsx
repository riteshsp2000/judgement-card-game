import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import FullPageLoader from "./components/FullPageLoader";
import useWebSocket from "./hooks/useWebSocket";
import { WebSocketConnectionProvider } from "./contexts/WebSocketConnectionProvider";
import { WebSocketResponse } from "./types";
import { GameProvider } from "./contexts/GameProvider";
import { useGame } from "./hooks/useGame";
import { WS_API_BASE_URL } from "./constants/env";

const CreateGame = lazy(() => import("~/screens/CreateGame"));
const Lobby = lazy(() => import("~/screens/Lobby"));
const GameScreen = lazy(() => import("~/screens/Game"));

const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <h1>home screen</h1>,
  },
  {
    path: "/game/create",
    element: <CreateGame />,
  },
  {
    path: "/game/lobby/:gameId",
    element: <Lobby />,
  },
  {
    path: "/game/play/:gameId",
    element: <GameScreen />,
  },
];

const router = createBrowserRouter(ROUTES);

const AppShell: React.FC = () => {
  return (
    <Suspense
      fallback={<FullPageLoader title="Please wait" description="loading..." />}
    >
      <GameProvider>
        <App />
      </GameProvider>
    </Suspense>
  );
};

const App = () => {
  const { setGame } = useGame();

  const webSocket = useWebSocket<WebSocketResponse>({
    url: WS_API_BASE_URL,
    onMessage: (data) => {
      setGame(data);
    },
  });

  return (
    <WebSocketConnectionProvider webSocket={webSocket}>
      <RouterProvider router={router} />
    </WebSocketConnectionProvider>
  );
};

export default AppShell;
