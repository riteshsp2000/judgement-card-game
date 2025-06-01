/**
 * takes in the game state
 */
export class GameService {
  private game: unknown;

  constructor(game: unknown) {
    this.game = game;
  }

  createGame() {}

  joinGame() {}

  leaveGame() {}
}
