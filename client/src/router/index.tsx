import { lazy } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AppInitialiser from "./AppInitializer";
import Home from "~/screens/Home";

const CreateGame = lazy(() => import("~/screens/CreateGame"));
const Lobby = lazy(() => import("~/screens/Lobby"));
const GameScreen = lazy(() => import("~/screens/Game"));

const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <AppInitialiser />,
    children: [
      {
        index: true,
        element: <Home />,
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
    ],
  },
];

const router = createBrowserRouter(ROUTES);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
