import { lazy } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AppInitialiser from "./AppInitializer";

const Home = lazy(() => import("~/screens/Home"));
const CreateGame = lazy(() => import("~/screens/CreateGame"));
const Lobby = lazy(() => import("~/screens/Lobby"));
const GameScreen = lazy(() => import("~/screens/Game"));
const JoinGame = lazy(() => import("~/screens/JoinGame"));
const PageNotFound = lazy(() => import("~/screens/404"));

const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <AppInitialiser />,
    children: [
      {
        index: true,
        element: <JoinGame />,
      },
      {
        path: "create",
        element: <CreateGame />,
      },
      {
        path: "lobby/:gameId",
        element: <Lobby />,
      },
      {
        path: "play/:gameId",
        element: <GameScreen />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(ROUTES);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
