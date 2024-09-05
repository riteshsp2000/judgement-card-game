import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { Input } from "../ui/input";

interface JoinGameDrawerProps {
  onClose: () => void;
  open: boolean;
}

const JoinGameDrawer: React.FC<JoinGameDrawerProps> = ({ onClose, open }) => {
  return (
    <Drawer onClose={onClose} open={open} modal>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Join Game</DrawerTitle>
          <DrawerDescription>
            Please enter the ID of the game that you'd want to join. It'll be a
            8 digit alphanumber code
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Input />
        </div>

        <DrawerFooter className="flex flex-row justify-between items-center">
          <Button className="flex-1">Join</Button>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default JoinGameDrawer;
