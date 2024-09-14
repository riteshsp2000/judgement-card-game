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
export const generateRoundId = () => `round:${generateUniqueId()}`;
export const generateHandId = () => `hand:${generateUniqueId()}`;

const names = [
  {
    name: "Batman",
    img: "https://res.cloudinary.com/riteshp2000/image/upload/v1726305834/batman_allrfy.jpg",
  },
  {
    name: "Morty",
    img: "https://res.cloudinary.com/riteshp2000/image/upload/v1726305922/morty_k1zw57.jpg",
  },
  {
    name: "Jon Snow",
    img: "https://res.cloudinary.com/riteshp2000/image/upload/v1726305984/download_joa8qw.jpg",
  },
  {
    name: "Thanos",
    img: "https://res.cloudinary.com/riteshp2000/image/upload/v1726306091/thanos_j28gsj.jpg",
  },
];

export const generatePlayerName = (
  gameId: string,
  gameNames: Map<string, Array<{ name: string; img: string }>>
) => {
  let usedNames = gameNames.get(gameId);
  if (!usedNames) usedNames = [];

  const unusedNames = names.filter((name) => !usedNames.includes(name));
  const newName = unusedNames[Math.floor(Math.random() * unusedNames.length)];
  gameNames.set(gameId, [...usedNames, newName]);
  return newName;
};
