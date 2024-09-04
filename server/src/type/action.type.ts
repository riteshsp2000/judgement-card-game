import { Game } from "~/dto/game";
import { Player } from "~/dto/player";

export enum ACTION {
  CREATE_GAME = "CREATE_GAME",
  JOIN_GAME = "JOIN_GAME",
  START_GAME = "START_GAME",
  START_ROUND = "START_ROUND",
  PLAY_CARD = "PLAY_CARD",
}

export interface CreateGameRequest {}

export interface JoinGameRequest {
  gameId: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface StartRoundRequest {
  gameId: string;
}

export interface PlayCardRequest {}

export type RequestPayload =
  | CreateGameRequest
  | JoinGameRequest
  | StartGameRequest
  | StartRoundRequest
  | PlayCardRequest;

export interface Request {
  game?: Game;
  player?: Player;
  action: {
    type: ACTION;
    payload: RequestPayload;
  };
}
