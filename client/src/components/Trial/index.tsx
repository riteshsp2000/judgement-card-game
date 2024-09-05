import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function Trial() {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <header className="bg-card p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold text-card-foreground">Judgement</h1>
        <Button variant="ghost" size="icon">
          <MenuIcon className="w-6 h-6 text-card-foreground" />
          <span className="sr-only">Menu</span>
        </Button>
      </header>
      <main className="flex-1 grid grid-cols-1 gap-4 p-4">
        <Card className="bg-card text-card-foreground flex flex-col justify-center items-center p-6">
          <PlusIcon className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">New Game</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Start a new game of Judgement
          </p>
          <Button>Create Game</Button>
        </Card>
        <Card className="bg-card text-card-foreground flex flex-col justify-center items-center p-6">
          <UsersIcon className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Lobby</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Join an existing game of Judgement
          </p>
          <Button>Join Game</Button>
        </Card>
      </main>
      <footer className="bg-card p-4 border-t flex justify-end">
        <Button variant="ghost" size="icon">
          <TrophyIcon className="w-6 h-6 text-card-foreground" />
          <span className="sr-only">Scoreboard</span>
        </Button>
      </footer>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
