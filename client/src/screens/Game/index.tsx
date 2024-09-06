import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Trophy, Spade } from "lucide-react";
import CardImg from "~/components/CardImg";
import Layout from "~/components/Layout";
import { Avatar } from "~/components/ui/avatar";
import { Card, RANK, SUIT } from "~/dto/card";

const dealtCards = [
  {
    suit: SUIT.SPADE,
    rank: 14 as RANK,
  },
  {
    suit: SUIT.HEART,
    rank: 14 as RANK,
  },
  {
    suit: SUIT.CLUB,
    rank: 14 as RANK,
  },
  {
    suit: SUIT.DIAMOND,
    rank: 14 as RANK,
  },
  {
    suit: SUIT.DIAMOND,
    rank: 13 as RANK,
  },
  {
    suit: SUIT.DIAMOND,
    rank: 12 as RANK,
  },
  {
    suit: SUIT.DIAMOND,
    rank: 11 as RANK,
  },
].map((c) => new Card(c));

const playedCards: {
  player: {
    id: string;
    name: string;
  };
  card: Card;
  type: "OWN" | "OTHERS";
}[] = [
  {
    player: { id: "1234", name: "AL" },
    card: new Card({ suit: SUIT.SPADE, rank: 11 as RANK }),
    type: "OTHERS",
  },
  {
    player: { id: "1234", name: "DG" },
    card: new Card({ suit: SUIT.SPADE, rank: 12 as RANK }),
    type: "OTHERS",
  },
  {
    player: { id: "1234", name: "MP" },
    card: new Card({ suit: SUIT.SPADE, rank: 13 as RANK }),
    type: "OTHERS",
  },
  {
    player: { id: "1234", name: "RP" },
    card: new Card({ suit: SUIT.SPADE, rank: 14 as RANK }),
    type: "OWN",
  },
];

const Game = () => {
  return (
    <Layout
      footer={
        <div className="w-full pl-4 py-2 bg-[#35654d] flex gap-3 items-start overflow-x-auto whitespace-nowrap">
          {dealtCards.map((card, index) => (
            <div className="flex-shrink-0" key={index}>
              <CardImg card={card} />
            </div>
          ))}
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="rounded border flex-1 flex flex-col justify-center items-center aspect-square p-4">
          <Trophy />
          <h3 className="text-sm font-semi-bold">score</h3>
        </div>

        <div className="rounded border flex-1 flex flex-col justify-center items-center aspect-square p-4">
          <Spade />
          <h3 className="text-sm font-semi-bold">trump</h3>
        </div>

        <div className="rounded border flex-1 flex flex-col justify-center items-center aspect-square p-4">
          <Trophy />
          <h3 className="text-sm font-semi-bold">hands</h3>
        </div>

        <div className="rounded border flex-1 flex flex-col justify-center items-center aspect-square p-4">
          <Trophy />
          <h3 className="text-sm font-semi-bold">score</h3>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-md border bg-[#43a373] flex flex-wrap items-start justify-around gap-3">
        {playedCards.map((c, index) => (
          <div
            key={index}
            className={
              c.type === "OWN" ? "border-red-700 border-4 rounded p-1" : ""
            }
          >
            <div className="flex mb-2">
              <Avatar className="w-5 h-5">
                <AvatarImage
                  src={"https://avatars.githubusercontent.com/u/124599?v=4"}
                />
                <AvatarFallback>{c.player.name}</AvatarFallback>
              </Avatar>
              <h5 className="text-sm font-medium ml-2">{c.player.name}</h5>
            </div>
            <CardImg card={c.card} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Game;
