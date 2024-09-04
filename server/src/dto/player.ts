import { generatePlayerId } from "~/util/generateId";

export class Player {
  public id = generatePlayerId();

  constructor() {}
}
