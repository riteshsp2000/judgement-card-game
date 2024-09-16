export const ERRORS = {
  INVALID_ACTION: {
    code: 401,
    message: "Invalid action used, please use a valid action",
  },
  GAME_FULL: {
    code: 411,
    message: "Game Full. Maximum players playing",
  },
  GAME_NOT_FOUND: {
    code: 412,
    message: "Game not found, please join another game",
  },
  PLAYER_NOT_FOUND: {
    code: 413,
    message: "Player not found",
  },
  INVALID_HANDS_CALLED: {
    code: 414,
    message: "Invalid hands called",
  },
  INVALID_CARD_PLAYED: {
    code: 415,
    message: "Invalid card played, please play another card",
  },
  INVALID_PLAYER_PLAYING: {
    code: 416,
    message: "Wrong player playing, please wait for your turn",
  },
  CANNOT_START_GAME: {
    code: 417,
    message: "Cannot start the game (min-max players unfulfilled)",
  },
  ROUND_IN_PROGRESS: {
    code: 418,
    message: "Cannot start a new round in the middle of one",
  },
  HANDS_ALREADY_CALLED: {
    code: 419,
    message: "Number of Hands already called",
  },
  HANDS_NOT_CALLED: {
    code: 420,
    message: "Not all players called called hands",
  },
  PLAYER_HAS_NO_CARD: {
    code: 421,
    message: "Player does not have the played card",
  },
  PLAYER_HAS_NO_VALID_CARD: {
    code: 422,
    message: "Please play a valid card",
  },
  PLAYER_ALREADY_PLAYED_CARD: {
    code: 423,
    message: "You have already played a card",
  },
  NOT_ENOUGH_CARDS: {
    code: 424,
    message: "Not enough cards in deck",
  },
};
