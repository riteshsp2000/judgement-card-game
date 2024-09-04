import { Game } from "./game";
import { Player } from "./player";

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

export interface StartGameRequest {}

export interface StartRoundRequest {}

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

export enum REACTION {
  GAME_CREATED = "GAME_CREATED",
  GAME_JOINED = "GAME_JOINED",
}

export interface Response {
  game: Game;
  player: Player;
}
