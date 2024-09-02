## Schemas

1.  ActiveGames

- gameId: Game

2.  Game

- players: Player[] (make sure order is maintained)
- maxPlayers: number
- minPlayers: number
- currentHand: Hand[]
- previousHands: Hand[]
- score: {
  playerId: number[]
  }
- dealtCards: [
  playerId: Card[]
  ]
- status: STARTED | ROUND_IN_PROGRESS | ROUND_COMPLETED | COMPLETED
- trumpCard: Card[]
- playerToPlay: Player

## Steps

1. CREATE_GAME

- generate a unique game id
- creates the player object who created the game
- initialise the game object
- adds the player to the game object
- stores the game in the active games object

2. JOIN_GAME

- takes in a game ID to be joined
- checks if a game can be joined (min and max)
- creates the player object
- adds the player to the game object
- updates the active games object

3. START_GAME

- checks if a game can be started (min and max)
- deals card to each player

4. START_ROUND

- checks if round can be started
- assigns player to play
- assigns trump card
- starts the round

5. PLAY_CARD

- checks if user has the card
- checks if the card can be played (same suite, playing trump, no suite any card can be played)
- check if all players played
- if so, determine winner
- updates scores
- updates player to play
- check if round ended
- if so, start a new round
