import React from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AppBar: React.FC = () => {
  return (
    <header className="bg-card p-4 border-b flex items-center justify-between fixed top-0 left-0 w-screen h-16">
      <h1 className="text-xl font-bold text-card-foreground">Judgement</h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6 text-card-foreground" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>

          <p>content to go all the way here</p>

          <SheetFooter>Sheet Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default AppBar;
