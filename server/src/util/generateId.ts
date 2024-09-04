function generateUniqueId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export const generateGameId = () => `game:${generateUniqueId()}`;
export const generatePlayerId = () => `player:${generateUniqueId()}`;
export const generateHandId = () => `hand:${generateUniqueId()}`;
