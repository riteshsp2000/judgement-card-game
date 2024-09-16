import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  PlayIcon,
  ClubIcon,
  DiamondIcon,
  HeartIcon,
  SpadeIcon,
} from "lucide-react";
import ShufflingCards from "~/components/ShufflingCards";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <Card className="border-2 shadow-xl border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="mb-2 text-5xl font-bold text-primary">
              Judgement
            </CardTitle>
            <CardDescription className="text-2xl">
              The Ultimate Card Game of Prediction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ShufflingCards />
            <p className="text-lg text-center text-muted-foreground">
              Call your hands, play your cards, and score points by matching
              your prediction!
            </p>
            <div className="flex justify-center space-x-8">
              {[ClubIcon, DiamondIcon, HeartIcon, SpadeIcon].map(
                (Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <Icon className="w-12 h-12 text-primary" />
                  </motion.div>
                )
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-40 text-lg" size="lg">
              <PlayIcon className="w-5 h-5 mr-2" /> Start Game
            </Button>
          </CardFooter>
        </Card>

        <div className="p-6 mt-4 rounded-lg shadow-inner bg-muted">
          <h3 className="mb-3 text-xl font-bold">How to Play:</h3>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li>Players predict the number of hands they'll win</li>
            <li>Each round, players play one card from their hand</li>
            <li>The highest card wins the hand</li>
            <li>Score points by matching your prediction exactly</li>
            <li>The player with the most points after all rounds wins!</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
