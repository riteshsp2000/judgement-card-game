import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];

function ShufflingCards() {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    const generateCard = () => {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      return `/assets/cards/${value}_of_${suit}.svg`;
    };

    setCards([
      generateCard(),
      generateCard(),
      generateCard(),
      generateCard(),
      generateCard(),
    ]);

    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards.shift();
        newCards.push(generateCard());
        return newCards;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-40 overflow-hidden">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={`${card}-${index}`}
            initial={{ opacity: 0, scale: 0.5, x: -100, y: 50, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, x: index * 60, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 300, y: 50, rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-24 h-36"
          >
            <img
              src={card}
              alt={card.replace(".png", "")}
              className="object-cover w-full h-full rounded-lg shadow-md"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ShufflingCards;
