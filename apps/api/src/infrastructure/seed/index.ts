import { logger } from "@/common/utils";
import { seedPlatformApiKeys } from "./platform-api-key";

export const seedDatabase = async (): Promise<void> => {
  await seedPlatformApiKeys();

  logger.info("Database seeded successfully.");
};
