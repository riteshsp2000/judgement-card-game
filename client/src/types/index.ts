import { Card, SUIT, TRUMP } from "~/dto/card";
import { ACTION } from "./action.types";

export enum GAME_STATUS {
  CREATED = "CREATED",
  STARTED = "STARTED",
  ROUND_IN_PROGRESS = "ROUND_IN_PROGRESS",
  ROUND_COMPLETED = "ROUND_COMPLETED",
  COMPLETED = "COMPLETED",
}

export enum ROUND_STATUS {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

export interface ICard {
  card: Card;
  playerId: string;
}

export interface Hand {
  cards: Record<string, ICard>;
  handWinner: ICard;
  trump: TRUMP;
  firstPlayedSuit?: SUIT;
  numberOfPlayersPlaying: number;
}

export interface Round {
  id: string;
  trump: TRUMP;
  currentHand?: Hand;
  previousHands: Array<Hand>;
  numberOfCardsToDeal: number;
  cardsDealt: Record<string, Array<Card>>;
  numberOfPlayersPlaying: number;
  numberOfHandsCalled: Record<string, number>;
  numberOfHandsMade: Record<string, number>;
}

export interface Game {
  id: string;
  players: Array<Player>;
  maxPlayers: number;
  minPlayers: number;
  numberOfCardsToDeal: number;
  status: GAME_STATUS;
  playerToPlay: number;
  currentRound: Round;
  rounds: Array<Round>;
  score: Record<string, number>;
}

export interface Player {
  id: string;
  name: string;
  img: string;
}

export interface WebSocketErrorResponse {
  action: "ERROR";
  payload: {
    code: number;
    message: string;
    description?: string;
  };
}

export interface WebSocketSuccessResponse {
  game: Game | null;
  player?: Player | null;
  action: ACTION | null;
}

export type WebSocketResponse =
  | WebSocketErrorResponse
  | WebSocketSuccessResponse;
