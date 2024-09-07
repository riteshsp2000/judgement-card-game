import { Suspense } from "react";
import FullPageLoader from "./components/FullPageLoader";
import { GameProvider } from "./contexts/GameProvider";

import Router from "./router";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <Suspense
      fallback={<FullPageLoader title="Please wait" description="loading..." />}
    >
      <GameProvider>
        <Router />
        <Toaster />
      </GameProvider>
    </Suspense>
  );
};

export default App;
