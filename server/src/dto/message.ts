export enum ACTION {
  CREATE_GAME = "CREATE_GAME",
  JOIN_GAME = "JOIN_GAME",
  START_GAME = "START_GAME",
  START_ROUND = "START_ROUND",
  PLAY_CARD = "PLAY_CARD",
}

export interface CreateGamePayload {}

export interface JoinGamePayload {}

export interface StartGamePayload {}

export interface StartRoundPayload {}

export interface PlayCardPayload {}

export type Payload =
  | CreateGamePayload
  | JoinGamePayload
  | StartGamePayload
  | StartRoundPayload
  | PlayCardPayload;

export interface Message {
  gameId: string;
  playerId: string;
  action: {
    type: ACTION;
    payload: Payload;
  };
}
