import { v4 as uuidv4 } from "uuid";

export const generateGameId = () => `game:${uuidv4()}`;

export const generatePlayerId = () => `player:${uuidv4()}`;
