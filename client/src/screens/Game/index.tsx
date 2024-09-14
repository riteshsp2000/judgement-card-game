import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "~/components/FullPageLoader";
import Layout from "~/components/Layout";
import { STAGES, useGameState } from "~/hooks/useGameState";

import HandWinner from "./HandWinner";
import PlayCards from "./PlayCards";
import CallHands from "./CallHands";
import Scoreboard from "./Scoreboard";
import Tabs from "./Tabs";
import DealtCards from "./DealtCards";
import PlayerToPlay from "./PlayerToPlay";
import HandsMadeCalled from "./HandsMadeCalled";

const Game = () => {
  const navigate = useNavigate();
  const { state, actions } = useGameState();
  const { game, player } = state;

  useEffect(() => {
    if (!game || !player) {
      return navigate(`/game/create`);
    }
  }, [game, navigate, player]);

  if (!game || !player) return <FullPageLoader />;

  return (
    <Layout
      footer={
        <DealtCards
          game={game}
          player={player}
          onCardClick={actions.handleDealtCardClick}
        />
      }
    >
      <Tabs onStartRoundClick={actions.handleRoundStartClick} />

      {(() => {
        switch (state.stage) {
          case STAGES.START_ROUND:
            return <Scoreboard score={state.scorecard} />;

          case STAGES.CALL_HANDS:
            return (
              <>
                <CallHands
                  game={state.game}
                  onSubmitNumberOfHands={actions.handleCallHandClick}
                />
              </>
            );

          case STAGES.PLAY_CARDS:
            return (
              <>
                <PlayerToPlay player={state.playerToPlayer} />
                <PlayCards game={game} player={player} />
              </>
            );

          case STAGES.START_HAND:
            return (
              <>
                <PlayerToPlay player={state.playerToPlayer} />
                <HandsMadeCalled
                  handsMadeCalled={state.handsMadeAndCalled}
                  showHandsCalled
                />
                <HandWinner game={game} />
              </>
            );

          default:
            return <>unhandled case, think of it</>;
        }
      })()}
    </Layout>
  );
};

export default Game;
