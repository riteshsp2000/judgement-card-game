import { generatePlayerId, generatePlayerName } from "~/util/generateId";

export class Player {
  public id;
  public name;
  public img;

  constructor({ name, img }: { name: string; img: string }) {
    this.id = generatePlayerId();
    this.name = name;
    this.img = img;
  }
}
