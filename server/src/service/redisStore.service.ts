import Redis, { Redis as RedisClient } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "~/constant/env";

export class RedisStore {
  private client: RedisClient;
  private isReady = false;

  constructor() {
    const options = {
      host: REDIS_HOST,
      port: REDIS_PORT,
    };

    this.client = new Redis(options);

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
    this.client.on("ready", () => {
      console.log("Redis client connected successfully");
      this.isReady = true;
    });
  }

  // Await the connection to be ready before performing operations
  public async ensureConnection() {
    if (!this.isReady) {
      await new Promise((resolve) => {
        this.client.once("ready", () => {
          resolve(true);
        });
      });
    }
  }

  // Store data in Redis with a specified key and value
  public async setValue(key: string, value: unknown, expirationInSeconds = 0) {
    try {
      await this.ensureConnection();
      await this.client.set(key, JSON.stringify(value));
      if (expirationInSeconds > 0) {
        await this.client.expire(key, expirationInSeconds);
      }
    } catch (error) {
      console.error(`Error storing data in Redis: ${error}`);
    }
  }

  // Get data from Redis using a specified key
  public async getValue(key: string) {
    try {
      await this.ensureConnection();
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error(`Error getting data from Redis: ${error}`);
    }
  }

  // Remove data from Redis using a specified key
  public async removeValue(key: string) {
    try {
      await this.ensureConnection();
      await this.client.del(key);
    } catch (error) {
      console.error(`Error removing data from Redis: ${error}`);
    }
  }

  // Close the Redis connection
  public async close() {
    try {
      await this.ensureConnection();
      await this.client.quit();
      console.log("Redis connection closed successfully.");
    } catch (error) {
      console.error(`Error closing Redis connection: ${error}`);
    }
  }
}

export const redisStore = new RedisStore();
