import { seedPlatformApiKeys } from "./platform-api-key";

export const seedDatabase = async (): Promise<void> => {
  await seedPlatformApiKeys();
};
