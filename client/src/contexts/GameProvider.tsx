import { createContext, PropsWithChildren, useState } from "react";
import { WebSocketSuccessResponse } from "~/types";

interface GameContextType extends WebSocketSuccessResponse {
  setGame: React.Dispatch<React.SetStateAction<WebSocketSuccessResponse>>;
}

export const GameContext = createContext<GameContextType>({
  game: null,
  player: null,
  action: null,
  setGame: () => {},
});

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<WebSocketSuccessResponse>({
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
