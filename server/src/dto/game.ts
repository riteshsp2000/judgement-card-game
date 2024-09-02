export enum GAME_STATUS {
  CREATED = "CREATED",
  STARTED = "STARTED",
  ROUND_IN_PROGRESS = "ROUND_IN_PROGRESS",
  ROUND_COMPLETED = "ROUND_COMPLETED",
  COMPLETED = "COMPLETED",
}

export class Game {
  public players: Array<{}> = [];
  private maxPlayers = 4;
  private minPlayers = 4;
  public currentHand: Array<{}> = [];
  public previousHand: Record<string, Array<{}>> | undefined;
  public score: Record<string, Array<number>> | undefined;
  public dealtCards: Record<string, Array<{}>> | undefined;
  public status: GAME_STATUS = GAME_STATUS.CREATED;

  constructor() {}
}
