import { RedisClient } from "bun";
import { ICacheProvider } from "../types/cache.interface";
import { env } from "@/config/env";
import { logger } from "@/common/utils";

export class RedisCacheProvider implements ICacheProvider {
  private readonly client: RedisClient;

  constructor() {
    this.client = new RedisClient(env.redisUrl ?? "localhost:6379");
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    this.client.close();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(key: string, value: T, options: { ttl: number }): Promise<void> {
    const serializedValue = JSON.stringify(value);

    if (options?.ttl !== undefined) {
      await this.client.set(key, serializedValue);
      await this.client.expire(key, options.ttl);
      return;
    }

    await this.client.set(key, serializedValue);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exist(key: string): Promise<boolean> {
    return await this.client.exists(key);
  }

  async expire(key: string, ttl: number): Promise<boolean> {
    const record = await this.client.expire(key, ttl);

    return record === 1;
  }

  async ttl(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  async deleteByPattern(
    pattern: string,
    chunkSize: number = 100,
  ): Promise<void> {
    let cursor = "0";
    const allKeys: string[] = [];

    do {
      const [nextCursor, keys] = await this.client.scan(
        cursor,
        "MATCH",
        pattern,
      );
      allKeys.push(...keys);
      cursor = nextCursor;

      if (allKeys.length >= chunkSize) {
        await this.client.del(...allKeys);
        logger.info(`Deleted ${allKeys.length} keys matching: ${pattern}`);
      }
    } while (cursor !== "0");

    if (allKeys.length > 0) {
      await this.client.del(...allKeys);
      logger.info(`Deleted ${allKeys.length} keys matching: ${pattern}`);
    }
  }
}
