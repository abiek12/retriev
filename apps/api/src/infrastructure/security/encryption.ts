import {
  ALGORITHM,
  AUTH_TAG_LENGTH,
  IV_LENGTH,
} from "@/common/constants/app.constants";
import { env } from "@/config/env";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

const getKey = (): Buffer => {
  return createHash("sha256").update(env.encryptionKey).digest();
};

// Helper: Encrypt text
export const encrypt = (value: string) => {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
};

// Helper: Decrpyt text
export const decrypt = (value: string) => {
  const [ivBase64, authTagBase64, encryptedBase64] = value.split(":");

  if (!ivBase64 || !authTagBase64 || !encryptedBase64) {
    throw new Error("Invalid encrypted value");
  }

  const iv = Buffer.from(ivBase64, "base64");
  const authTag = Buffer.from(authTagBase64, "base64");
  const encrypted = Buffer.from(encryptedBase64, "base64");

  if (iv.length !== IV_LENGTH) {
    throw new Error("Invalid initialization vector");
  }

  if (authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error("Invalid authentication tag");
  }

  const key = getKey();

  const decipher = createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
