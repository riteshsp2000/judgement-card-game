import { GAME_STATUS } from "~/type/game.type";
import { generateGameId } from "~/util/generateId";
import { Card } from "~/dto/card";
import { Hand } from "~/dto/hand";
import { Player } from "~/dto/player";

export class Game {
  public id: string = generateGameId();
  public players: Array<Player> = [];
  private maxPlayers = 2;
  private minPlayers = 4;
  public currentHand: Array<Hand> = [];
  public previousHand: Record<string, Array<Hand>> = {};
  public score: Record<string, Array<number>> = {};
  public dealtCards: Record<string, Array<Card>> = {};
  public status: GAME_STATUS = GAME_STATUS.CREATED;

  constructor() {}

  canAddPlayer() {
    return this.players.length < this.maxPlayers;
  }

  addPlayer(player: Player) {
    if (this.canAddPlayer()) {
      this.players.push(player);
    }
  }
}
