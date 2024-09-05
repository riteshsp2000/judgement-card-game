import { LoaderIcon } from "lucide-react";

interface FullPageLoaderProps {
  title?: string;
  description?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  title = "Loading...",
  description = "Shuffling the cards and preparing the game",
}) => {
  return (
    <div className="flex-1 grid place-items-center h-screen w-screen z-50 bg-background">
      <div className="bg-card p-6 rounded-lg text-card-foreground flex flex-col items-center justify-center space-y-4">
        <LoaderIcon className="w-12 h-12 animate-spin" />
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
