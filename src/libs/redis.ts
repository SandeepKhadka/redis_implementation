import envConfig from "@/config/envConfig";
import { createClient, RedisClientType } from "redis";

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: envConfig.REDIS_URL,
    });

    this.client.on("connect", () => console.log("Connected to Redis"));
    this.client.on("error", (err) => console.error("Redis error:", err));
    this.client.connect();
  }

  // Singleton pattern: Ensure a single instance
  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  // Helper methods for Redis operations
  async set(key: string, value: string, expiryInSeconds?: number): Promise<void> {
    try {
      if (expiryInSeconds) {
        await this.client.set(key, value, { EX: expiryInSeconds });
      } else {
        await this.client.set(key, value);
      }
      console.log(`Key "${key}" set successfully`);
    } catch (error) {
      console.error(`Error setting key "${key}":`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      console.log(`Retrieved value for key "${key}":`, value);
      return value;
    } catch (error) {
      console.error(`Error retrieving key "${key}":`, error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const result = await this.client.del(key);
      console.log(`Key "${key}" deleted successfully:`, result);
    } catch (error) {
      console.error(`Error deleting key "${key}":`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      console.log(`Key "${key}" exists:`, result === 1);
      return result === 1;
    } catch (error) {
      console.error(`Error checking key "${key}" existence:`, error);
      throw error;
    }
  }

  async flushAll(): Promise<void> {
    try {
      await this.client.flushAll();
      console.log("All keys flushed from Redis");
    } catch (error) {
      console.error("Error flushing Redis:", error);
      throw error;
    }
  }
}

export default RedisClient;
