import { useCallback, useMemo } from "react";
import { useGame } from "./useGame";
import { useWebSocketConnection } from "./useWebSocketConnection";
import { ACTION } from "~/types/action.types";
import { Card } from "~/dto/card";
import { Player } from "~/types";

export enum STAGES {
  START_ROUND = "START_ROUND", // shows scoreboard
  CALL_HANDS = "CALL_HANDS", // shows hands input and hands called
  //   Repeats after every hand from here
  START_HAND = "START_HAND", // shows hands called and hands made and the card won
  PLAY_CARDS = "PLAY_CARDS", // shows cards played
}

export interface IndividualScore {
  player: Player;
  score: number;
  correct: number;
  incorrect: number;
}

export interface ScoreCard {
  players: Array<IndividualScore>;
  roundsPlayed: number;
}

export interface IndividualHand {
  player: Player;
  handsCalled: number;
  handsMade: number;
}

export interface Hands {
  players: Array<IndividualHand>;
}

export const useGameState = () => {
  const { game, player } = useGame();
  const ws = useWebSocketConnection();

  const allPlayersCalledHands = useMemo(() => {
    if (!game?.currentRound?.numberOfHandsCalled) return false;

    if (
      Object.keys(game?.currentRound?.numberOfHandsCalled).length ===
      game?.players.length
    )
      return true;

    return false;
  }, [game?.currentRound?.numberOfHandsCalled, game?.players.length]);

  const allPlayersPlayedCards = useMemo(() => {
    if (!game?.currentRound?.currentHand?.cards) return false;

    if (
      Object.keys(game?.currentRound?.currentHand?.cards).length ===
      game?.players.length
    )
      return true;

    return false;
  }, [game?.currentRound?.currentHand?.cards, game?.players.length]);

  const isFirstRoundHand = useMemo(() => {
    if (game?.currentRound?.previousHands.length === 0) return true;

    return false;
  }, [game?.currentRound?.previousHands]);

  const stage = useMemo(() => {
    if (!game?.currentRound) return STAGES.START_ROUND;

    if (
      game.currentRound &&
      !game.currentRound.currentHand &&
      !allPlayersCalledHands
    )
      return STAGES.CALL_HANDS;

    if (
      game.currentRound &&
      !game.currentRound.currentHand &&
      allPlayersCalledHands
    )
      return STAGES.START_HAND;

    if (
      game.currentRound &&
      game.currentRound.currentHand &&
      !allPlayersPlayedCards
    )
      return STAGES.PLAY_CARDS;

    return STAGES.START_ROUND;
  }, [allPlayersCalledHands, allPlayersPlayedCards, game?.currentRound]);

  const scorecard = useMemo(() => {
    const score: ScoreCard = {
      players: [],
      roundsPlayed: 0,
    };

    if (game?.score && game?.players) {
      score.players = game.players.map((player) => ({
        player,
        score: game.score[player.id] || 0,
        correct: 0,
        incorrect: 0,
      }));
    }

    return score;
  }, [game?.players, game?.score]);

  const handsMadeAndCalled = useMemo(() => {
    const hands: Hands = {
      players: [],
    };

    if (game?.currentRound) {
      hands.players = game.players.map((player) => ({
        player,
        handsCalled: game.currentRound.numberOfHandsCalled[player.id] || 0,
        handsMade: game.currentRound.numberOfHandsMade[player.id] || 0,
      }));
    }

    return hands;
  }, [game?.currentRound, game?.players]);

  const playerToPlayer = useMemo(() => {
    return game?.players[game?.playerToPlay];
  }, [game?.playerToPlay, game?.players]);

  /**
   * utils
   */
  const getPlayerFromId = useCallback(
    (playerId?: string | null) => {
      if (!playerId || !game) return null;
      return game.players.filter((p) => p.id === playerId)[0];
    },
    [game]
  );

  /**
   * A list of actions used in the game
   */
  const handleRoundStartClick = useCallback(() => {
    ws?.sendMessage({
      action: {
        type: ACTION.START_ROUND,
      },
      game,
    });
  }, [game, ws]);

  const handleCallHandClick = useCallback(
    (numberOfHands: number | undefined) => {
      if (numberOfHands) {
        ws?.sendMessage({
          player,
          game,
          action: {
            type: ACTION.CALL_HANDS,
            payload: {
              numberOfHands,
            },
          },
        });
      }
    },
    [game, player, ws]
  );

  const handleDealtCardClick = useCallback(
    (card: Card) => {
      ws?.sendMessage({
        player,
        game,
        action: {
          type: ACTION.PLAY_CARD,
          payload: {
            card,
          },
        },
      });
    },
    [game, player, ws]
  );

  return {
    state: {
      game,
      player,
      stage,
      allPlayersCalledHands,
      allPlayersPlayedCards,
      isFirstRoundHand,
      scorecard,
      handsMadeAndCalled,
      playerToPlayer,
    },
    actions: {
      handleRoundStartClick,
      handleCallHandClick,
      handleDealtCardClick,
    },
    utils: {
      getPlayerFromId,
    },
  };
};
