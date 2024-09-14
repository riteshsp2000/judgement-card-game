import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Trophy, Spade } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardImg from "~/components/CardImg";
import FullPageLoader from "~/components/FullPageLoader";
import Layout from "~/components/Layout";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card } from "~/dto/card";
import { useGame } from "~/hooks/useGame";
import { useWebSocketConnection } from "~/hooks/useWebSocketConnection";
import { ACTION } from "~/types/action.types";

enum STAGES {
  START_ROUND = "START_ROUND",
  CALL_HANDS = "CALL_HANDS",
  PLAY_CARDS = "PLAY_CARDS",
  SHOW_HAND_WINNER = "SHOW_HAND_WINNER",
  END_ROUND = "END_ROUND",
}

const Game = () => {
  const navigate = useNavigate();
  const { game, player } = useGame();
  const ws = useWebSocketConnection();

  const [numberOfHands, setNumberOfHands] = useState<number | undefined>();

  const stage = useMemo(() => {
    if (!game?.currentRound) return STAGES.START_ROUND;

    if (
      !game?.currentRound?.currentHand &&
      Object.keys(game.currentRound.numberOfHandsCalled).length <
        game.currentRound.numberOfPlayersPlaying
    )
      return STAGES.CALL_HANDS;

    if (
      !game?.currentRound?.currentHand &&
      Object.keys(game.currentRound.numberOfHandsCalled).length ===
        game.currentRound.numberOfPlayersPlaying
    )
      return STAGES.PLAY_CARDS;

    return STAGES.SHOW_HAND_WINNER;
  }, [game?.currentRound]);

  const handleRoundStartClick = () => {
    ws?.sendMessage({
      action: {
        type: ACTION.START_ROUND,
      },
      game,
    });
  };

  const handleCallHandClick = () => {
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
  };

  const handleDealtCardClick = (card: Card) => {
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
  };

  useEffect(() => {
    if (!game || !player) {
      return navigate(`/game/create`);
    }
  }, [game, navigate, player]);

  if (!game || !player) return <FullPageLoader />;

  return (
    <Layout
      footer={
        <div className="w-full px-4 py-2 bg-[#35654d] flex gap-3 items-start overflow-x-auto whitespace-nowrap">
          {game.currentRound?.cardsDealt[player.id]
            .map((c) => new Card(c))
            .map((card, index) => (
              <div
                className="flex-shrink-0"
                key={index}
                onClick={() => handleDealtCardClick(card)}
              >
                <CardImg card={card} />
              </div>
            )) || (
            <h2 className="text-lg font-bold text-center">
              please click on{" "}
              <i>
                <b>roundon</b>
              </i>{" "}
              to start the round
            </h2>
          )}
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="flex flex-col items-center justify-center flex-1 p-4 border rounded aspect-square">
          <Trophy />
          <h3 className="text-sm font-semi-bold">score</h3>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-4 border rounded aspect-square">
          <Spade />
          <h3 className="text-sm font-semi-bold">trump</h3>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-4 border rounded aspect-square">
          <Trophy />
          <h3 className="text-sm font-semi-bold">hands</h3>
        </div>

        <div
          onClick={handleRoundStartClick}
          className="flex flex-col items-center justify-center flex-1 p-4 border rounded aspect-square"
        >
          <Trophy />
          <h3 className="text-sm font-semi-bold">roundon</h3>
        </div>
      </div>

      {(() => {
        switch (stage) {
          case STAGES.START_ROUND:
            return (
              <>
                <div>show score board here</div>
              </>
            );

          case STAGES.CALL_HANDS:
            return (
              <>
                <div className="flex-col items-center justify-center p-4 mt-4 border rounded-md">
                  <h4 className="text-lg font-semibold">
                    Call number of hands
                  </h4>
                  <p className="mt-2 text-sm font-light">
                    Enter the number of hands you intend to make and then click
                    the submit button
                  </p>
                  <Input
                    value={numberOfHands}
                    onChange={(e) => setNumberOfHands(Number(e.target.value))}
                    className="mt-4"
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleCallHandClick}
                  >
                    Submit
                  </Button>
                </div>

                <div className="p-4 mt-4 border rounded-md">
                  <p className="mt-2 text-sm font-light">
                    waiting for{" "}
                    <i>
                      <b> {game.players[game.playerToPlay].name} </b>
                    </i>{" "}
                    to call number of hands
                  </p>

                  <div className="text-xs mt-">
                    {Object.entries(game.currentRound.numberOfHandsCalled).map(
                      (entry) => (
                        <p key={entry[0]} className="mt-2">
                          {game.players[game.playerToPlay].name} called -{" "}
                          {entry[1]} hands
                        </p>
                      )
                    )}
                  </div>
                </div>
              </>
            );

          case STAGES.PLAY_CARDS:
            return (
              <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
                {Object.values(game.currentRound?.currentHand?.cards || {}).map(
                  (cp, index) => {
                    const cardPlayer = game.players.filter(
                      (p) => p.id === cp.playerId
                    )[0];
                    return (
                      <div
                        key={index}
                        className={
                          cp.playerId === player.id
                            ? "border-red-700 border-4 rounded p-1"
                            : ""
                        }
                      >
                        <div className="flex mb-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={cardPlayer.img} />
                            <AvatarFallback>
                              {cardPlayer.name || "RP"}
                            </AvatarFallback>
                          </Avatar>
                          <h5 className="ml-2 text-sm font-medium">
                            {cardPlayer.name}
                          </h5>
                        </div>
                        <CardImg card={cp.card} />
                      </div>
                    );
                  }
                )}
              </div>
            );

          case STAGES.SHOW_HAND_WINNER:
            return (
              <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
                {Object.values(
                  game.currentRound?.previousHands[
                    game.currentRound?.previousHands.length - 1
                  ]?.cards || {}
                ).map((cp, index) => {
                  const cardPlayer = game.players.filter(
                    (p) => p.id === cp.playerId
                  )[0];
                  return (
                    <div
                      key={index}
                      className={
                        cp.playerId ===
                        game.currentRound?.previousHands[
                          game.currentRound?.previousHands.length - 1
                        ].handWinner.playerId
                          ? "border-blue-400 border-4 rounded p-1"
                          : ""
                      }
                    >
                      <div className="flex mb-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={cardPlayer.img} />
                          <AvatarFallback>
                            {cardPlayer.name || "RP"}
                          </AvatarFallback>
                        </Avatar>
                        <h5 className="ml-2 text-sm font-medium">
                          {cardPlayer.name}
                        </h5>
                      </div>
                      <CardImg card={cp.card} />
                    </div>
                  );
                })}
              </div>
            );

          default:
            return <>unhandled case, think of it</>;
        }
      })()}

      {/* {game.currentRound && (
        <>
          {game.currentRound?.currentHand ? (
            <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
              {Object.values(game.currentRound?.currentHand?.cards || {}).map(
                (cp, index) => {
                  const cardPlayer = game.players.filter(
                    (p) => p.id === cp.playerId
                  )[0];
                  return (
                    <div
                      key={index}
                      className={
                        cp.playerId === player.id
                          ? "border-red-700 border-4 rounded p-1"
                          : ""
                      }
                    >
                      <div className="flex mb-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage
                            src={
                              "https://avatars.githubusercontent.com/u/124599?v=4"
                            }
                          />
                          <AvatarFallback>
                            {cardPlayer.name || "RP"}
                          </AvatarFallback>
                        </Avatar>
                        <h5 className="ml-2 text-sm font-medium">
                          {cardPlayer.name}
                        </h5>
                      </div>
                      <CardImg card={cp.card} />
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <>
              {game.currentRound.previousHands.length ? (
                <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
                  {Object.values(
                    game.currentRound?.previousHands[
                      game.currentRound?.previousHands.length - 1
                    ]?.cards || {}
                  ).map((cp, index) => {
                    const cardPlayer = game.players.filter(
                      (p) => p.id === cp.playerId
                    )[0];
                    return (
                      <div
                        key={index}
                        className={
                          cp.playerId ===
                          game.currentRound?.previousHands[
                            game.currentRound?.previousHands.length - 1
                          ].handWinner.playerId
                            ? "border-blue-400 border-4 rounded p-1"
                            : ""
                        }
                      >
                        <div className="flex mb-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage
                              src={
                                "https://avatars.githubusercontent.com/u/124599?v=4"
                              }
                            />
                            <AvatarFallback>
                              {cardPlayer.name || "RP"}
                            </AvatarFallback>
                          </Avatar>
                          <h5 className="ml-2 text-sm font-medium">
                            {cardPlayer.name}
                          </h5>
                        </div>
                        <CardImg card={cp.card} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="flex-col items-center justify-center p-4 mt-4 border rounded-md">
                    <h4 className="text-lg font-semibold">
                      Call number of hands
                    </h4>
                    <p className="mt-2 text-sm font-light">
                      Enter the number of hands you intend to make and then
                      click the submit button
                    </p>
                    <Input
                      value={numberOfHands}
                      onChange={(e) => setNumberOfHands(Number(e.target.value))}
                      className="mt-4"
                    />
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleCallHandClick}
                    >
                      Submit
                    </Button>
                  </div>

                  <div className="p-4 mt-4 border rounded-md">
                    <p className="mt-2 text-sm font-light">
                      waiting for player{" "}
                      <i>
                        <b> {game.players[game.playerToPlay].id} </b>
                      </i>{" "}
                      to call number of hands
                    </p>

                    <div className="text-xs mt-">
                      {Object.entries(
                        game.currentRound.numberOfHandsCalled
                      ).map((entry) => (
                        <p key={entry[0]} className="mt-2">
                          {entry[0]} called - {entry[1]} hands
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )} */}
    </Layout>
  );
};

export default Game;
