import { Trophy, Spade } from "lucide-react";
import React from "react";

const Tabs: React.FC<{ onStartRoundClick: () => void }> = (props) => {
  return (
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
        onClick={props.onStartRoundClick}
        className="flex flex-col items-center justify-center flex-1 p-4 border rounded aspect-square"
      >
        <Trophy />
        <h3 className="text-sm font-semi-bold">roundon</h3>
      </div>
    </div>
  );
};

export default Tabs;
