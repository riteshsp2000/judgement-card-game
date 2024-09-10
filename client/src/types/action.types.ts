import { Card } from "~/dto/card";
import { Game, Player } from ".";

export enum ACTION {
  CREATE_GAME = "CREATE_GAME",
  JOIN_GAME = "JOIN_GAME",
  LEAVE_GAME = "LEAVE_GAME",
  START_GAME = "START_GAME",
  START_ROUND = "START_ROUND",
  CALL_HANDS = "CALL_HANDS",
  PLAY_CARD = "PLAY_CARD",
}

export interface JoinGameRequest {
  gameId: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface StartRoundRequest {
  gameId: string;
}

export interface CallHandRequest {
  numberOfHands: number;
}

export interface PlayCardRequest {
  card: Card;
}

export type RequestPayload =
  | JoinGameRequest
  | StartGameRequest
  | StartRoundRequest
  | PlayCardRequest
  | CallHandRequest;

export interface Request {
  game?: Game | null;
  player?: Player | null;
  action: {
    type: ACTION;
    payload?: RequestPayload;
  };
}
