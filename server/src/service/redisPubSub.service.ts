import Redis, { Redis as RedisClient, RedisOptions } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "~/constant/env";

type MessageHandler = (channel: string, message: string) => void;

export class RedisPubSub {
  private pubClient: RedisClient;
  private subClient: RedisClient;

  private isPubClientReady = false;
  private isSubClientReady = false;

  constructor() {
    const options = {
      host: REDIS_HOST,
      port: REDIS_PORT,
    };

    // Create publisher and subscriber clients
    this.pubClient = new Redis(options);
    this.subClient = new Redis(options);

    // Handle connection errors
    this.pubClient.on("error", (err) => {
      console.error("Redis Publisher Client Error:", err);
    });
    this.subClient.on("error", (err) => {
      console.error("Redis Subscriber Client Error:", err);
    });
    this.pubClient.on("ready", () => {
      console.log("Redis Publisher client connected successfully");
      this.isPubClientReady = true;
    });
    this.subClient.on("ready", () => {
      console.log("Redis Subscriber client connected successfully");
      this.isSubClientReady = true;
    });
  }

  async ensureConnection() {
    if (!this.isPubClientReady || !this.isSubClientReady) {
      await Promise.all([
        new Promise((resolve) => {
          this.subClient.once("ready", () => {
            resolve(true);
          });
        }),
        new Promise((resolve) => {
          this.pubClient.once("ready", () => {
            resolve(true);
          });
        }),
      ]);
    }
  }

  // Subscribe to a channel with a message handler
  async subscribe(channel: string, handler: MessageHandler): Promise<void> {
    try {
      console.log("REDIS SUBSCRIBE HANDLER: ", handler);
      await this.ensureConnection();
      this.subClient.subscribe(channel, (err, count) => {
        if (err) {
          console.error("Failed to subscribe: %s", err.message);
        } else {
          console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
          );
        }
      });
      this.subClient.on("message", handler);
    } catch (error) {
      console.error(`Error subscribing to channel ${channel}:`, error);
    }
  }

  // Unsubscribe from a channel
  async unsubscribe(channel: string): Promise<void> {
    try {
      await this.ensureConnection();
      await this.subClient.unsubscribe(channel);
      console.log(`Unsubscribed from channel: ${channel}`);
    } catch (error) {
      console.error(`Error unsubscribing from channel ${channel}:`, error);
    }
  }

  // Publish a message to a channel
  async publish(channel: string, message: unknown): Promise<void> {
    try {
      await this.ensureConnection();
      await this.pubClient.publish(channel, JSON.stringify(message));
      console.log(`Message published to channel ${channel}`);
    } catch (error) {
      console.error(`Error publishing message to channel ${channel}:`, error);
    }
  }

  // Close both Redis connections
  async close(): Promise<void> {
    try {
      await this.ensureConnection();
      await this.pubClient.quit();
      await this.subClient.quit();
      console.log("Redis Pub Sub connections closed successfully.");
    } catch (error) {
      console.error("Error closing Redis Pub Sub connections:", error);
    }
  }
}

export const redisPubSub = new RedisPubSub();
