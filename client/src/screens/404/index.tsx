import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useNavigate } from "react-router-dom";

const suits = ["♠", "♥", "♦", "♣"];

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [shuffledCards, setShuffledCards] = useState<string[]>([]);

  const handleBackToHomeClick = () => navigate("/");

  useEffect(() => {
    const shuffleCards = () => {
      const newCards = [...suits].sort(() => Math.random() - 0.5);
      setShuffledCards(newCards);
    };

    shuffleCards();
    const interval = setInterval(shuffleCards, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md border-2 shadow-xl border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-6xl font-bold text-primary">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Page Not Found</h2>
          <p className="text-center text-muted-foreground">
            Oops! It looks like this hand wasn't in the deck.
          </p>
          <div className="flex justify-center space-x-4">
            {shuffledCards.map((suit, index) => (
              <motion.div
                key={index}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-4xl ${
                  suit === "♥" || suit === "♦" ? "text-red-500" : "text-primary"
                }`}
              >
                {suit}
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-40" size="lg" onClick={handleBackToHomeClick}>
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
