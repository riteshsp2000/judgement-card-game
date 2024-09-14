import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Game } from "~/types";

const CallHands: React.FC<{
  game: Game | null;
  onSubmitNumberOfHands: (numberOfHands: number) => void;
}> = (props) => {
  const [numberOfHands, setNumberOfHands] = useState<number | undefined>();

  const handleSubmitNumberOfHands = () => {
    if (!numberOfHands) return;

    props.onSubmitNumberOfHands(numberOfHands);
  };

  return (
    <div className="flex-col items-center justify-center p-4 mt-4 border rounded-md">
      <h4 className="text-lg font-semibold">Call number of hands</h4>
      <p className="mt-2 text-sm font-light">
        Enter the number of hands you intend to make and then click the submit
        button
      </p>
      <Input
        value={numberOfHands}
        onChange={(e) => setNumberOfHands(Number(e.target.value))}
        className="mt-4"
      />
      <Button
        variant="outline"
        className="mt-4"
        onClick={handleSubmitNumberOfHands}
      >
        Submit
      </Button>
    </div>
  );
};

export default CallHands;
