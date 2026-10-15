import { db } from "@/infrastructure/database";
import ApiKeyController from "./api-key.controller";
import ApiKeyRepository from "./api-key.repository";
import ApiKeyService from "./api-key.service";

const apiKeyRepository = new ApiKeyRepository(db);
const apiKeyService = new ApiKeyService(apiKeyRepository);

export const apiKeyController = new ApiKeyController(apiKeyService);
