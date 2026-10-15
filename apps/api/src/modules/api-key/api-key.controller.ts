import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import {
  CreateApiKeyRequestDto,
  GetApiKeyRequestDto,
  RotateApiKeyRequestDto,
} from "@repo/shared";
import { ApiResponse } from "@/common/utils";
import { IApiKeyService } from "./types";

class ApiKeyController {
  constructor(private readonly apiKeyService: IApiKeyService) {}

  list = async (c: Context, query: GetApiKeyRequestDto) => {
    const userId = c.get("userId");

    const result = await this.apiKeyService.list(userId, query);

    return c.json(ApiResponse.success(result));
  };

  create = async (c: Context, payload: CreateApiKeyRequestDto) => {
    const userId = c.get("userId");
    const result = await this.apiKeyService.create(userId, payload);

    return c.json(ApiResponse.success(result));
  };

  rotate = async (c: Context, payload: RotateApiKeyRequestDto) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    if (!id) {
      throw new HTTPException(400, { message: "API key ID is required." });
    }

    const result = await this.apiKeyService.rotate(id, userId, payload);

    return c.json(ApiResponse.success(result));
  };

  delete = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    if (!id) {
      throw new HTTPException(400, { message: "API key ID is required." });
    }

    await this.apiKeyService.delete(id, userId);

    return c.json(ApiResponse.success(null));
  };
}

export default ApiKeyController;
