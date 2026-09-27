import { logger } from "@/common/utils";
import { db } from "../database";
import { userApiKey } from "@repo/database";
import { encrypt } from "../security";
import { env } from "@/config/env";
import { and, eq } from "drizzle-orm";

export const seedPlatformApiKeys = async (): Promise<void> => {
  try {
    const [existing] = await db
      .select({ id: userApiKey.id })
      .from(userApiKey)
      .where(
        and(
          eq(userApiKey.provider, "groq"),
          eq(userApiKey.capability, "chat"),
          eq(userApiKey.isPlatform, true),
        ),
      )
      .limit(1);

    if (existing) {
      logger.info("Platform API key already exists.");
      return;
    }

    await db.insert(userApiKey).values({
      title: "Retriev Platform Groq",
      userId: null,
      provider: "groq",
      encryptedKey: encrypt(env.groqApiKey),
      capability: "chat",
      isPlatform: true,
    });

    logger.info("Platform API key seeded successfully.");
  } catch (error) {
    logger.error("Error while seeding platform API keys!");
  }
};
