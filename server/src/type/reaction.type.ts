import { Game } from "~/dto/game";
import { Player } from "~/dto/player";

export enum REACTION {
  GAME_CREATED = "GAME_CREATED",
  GAME_JOINED = "GAME_JOINED",
}

export interface Response {
  game: Game;
  player?: Player;
}
