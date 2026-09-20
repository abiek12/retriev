import { RedisCacheProvider } from "./providers/redis-cache.provider";
import { CacheProvider } from "./types/cache.enum";
import { ICacheProvider } from "./types/cache.interface";

export class CacheFactory {
  private static instance: ICacheProvider;

  static getInstance(provider: CacheProvider) {
    if (this.instance) return this.instance;

    switch (provider) {
      case CacheProvider.REDIS:
        this.instance = new RedisCacheProvider();
      default:
        throw new Error("Unsupported redis provider!");
    }

    return this.instance;
  }
}
