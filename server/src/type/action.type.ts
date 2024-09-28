import { Card } from "~/dto/card";
import { Game } from "~/dto/game";
import { Player } from "~/dto/player";

export enum ACTION {
  CREATE_GAME = "CREATE_GAME",
  JOIN_GAME = "JOIN_GAME",
  START_GAME = "START_GAME",
  START_ROUND = "START_ROUND",
  CALL_HANDS = "CALL_HANDS",
  PLAY_CARD = "PLAY_CARD",
  LEAVE_GAME = "LEAVE_GAME",
}

export interface JoinGameRequest {
  gameId: string;
}

export interface CallHandRequest {
  playerId: string;
  numberOfHands: number;
}

export interface PlayCardRequest {
  playerId: string;
  card: Card;
}

export type RequestPayload =
  | JoinGameRequest
  | CallHandRequest
  | PlayCardRequest;

export interface Request {
  game?: Game;
  player?: Player;
  action: {
    type: ACTION;
    payload: RequestPayload;
  };
}

export interface Response {
  game: Game;
  player?: Player;
  action: ACTION;
}
