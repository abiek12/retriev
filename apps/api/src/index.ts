import app from "./app";
import { logger } from "./common/utils";
import { CacheFactory } from "./infrastructure/cache/cache.factory";
import { CacheProvider } from "./infrastructure/cache/types/cache.enum";

const cache = CacheFactory.getInstance(CacheProvider.REDIS);
await cache.connect();

export default {
  port: 3000,
  fetch: app.fetch,
};

logger.info("API server running on port 3000");

process.on("SIGTERM", async () => {
  await cache.disconnect();
  logger.info("Disconnected!");
});

process.on("SIGINT", async () => {
  await cache.disconnect();
  logger.info("Disconnected!");
});
