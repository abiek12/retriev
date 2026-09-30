import z from "zod";

export const ApiKeyCapabilitySchema = z.enum(["chat", "embedding", "both"]);
