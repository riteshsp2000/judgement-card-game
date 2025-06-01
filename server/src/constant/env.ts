<<<<<<< Updated upstream
export const PORT = 8080;
=======
export const PORT = process.env.PORT || 8080;
export const REDIS_HOST = process.env.REDIS_HOST || "redis";
export const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
>>>>>>> Stashed changes
