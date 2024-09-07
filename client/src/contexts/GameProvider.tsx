import { createContext, PropsWithChildren, useState } from "react";
import { WebSocketResponse } from "~/types";

interface GameContextType extends WebSocketResponse {
  setGame: React.Dispatch<React.SetStateAction<WebSocketResponse>>;
}

export const GameContext = createContext<GameContextType>({
  game: null,
  player: null,
  action: null,
  setGame: () => {},
});

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<WebSocketResponse>({
    game: null,
    player: null,
    action: null,
  });

  return (
    <GameContext.Provider value={{ ...state, setGame: setState }}>
      {children}
    </GameContext.Provider>
  );
};
