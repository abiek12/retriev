import { db } from "@/infrastructure/database";
import ApiKeyController from "./api-key.controller";
import ApiKeyRepository from "./api-key.repository";
import ApiKeyService from "./api-key.service";
import { ApiKeyValidatorFactory } from "@/infrastructure/api-key-validation/api-key-validator.factory";

const apiKeyRepository = new ApiKeyRepository(db);
const apiKeyService = new ApiKeyService(
  apiKeyRepository,
  ApiKeyValidatorFactory.create,
);

export const apiKeyController = new ApiKeyController(apiKeyService);
