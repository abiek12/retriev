import { seedPlatformApiKeys } from "./platform-api-key";

export const seedDatabase = async () => {
  await seedPlatformApiKeys();
};
