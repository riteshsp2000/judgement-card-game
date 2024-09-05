import { lazy } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

const CreateGame = lazy(() => import("~/screens/CreateGame"));
const Lobby = lazy(() => import("~/screens/Lobby"));
const Game = lazy(() => import("~/screens/Game"));

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
    element: <Game />,
  },
];

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
