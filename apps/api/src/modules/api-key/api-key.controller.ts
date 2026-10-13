import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import {
  CreateApiKeyRequestDto,
  GetApiKeyRequestDto,
  RotateApiKeyRequestDto,
  UpdateApiKeyRequestDto,
  updateApiKeyRequestSchema,
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

  create = async (c: Context) => {
    const userId = c.get("userId");
    const payload: CreateApiKeyRequestDto = await c.req.json();
    const result = await this.apiKeyService.create(userId, payload);

    return c.json(ApiResponse.success(result));
  };

  update = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    if (!id) {
      throw new HTTPException(400, { message: "API key ID is required." });
    }

    const payload = updateApiKeyRequestSchema.parse(await c.req.json());
    const result: UpdateApiKeyRequestDto = payload;
    const updated = await this.apiKeyService.update(id, userId, result);

    return c.json(ApiResponse.success(updated));
  };

  rotate = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    if (!id) {
      throw new HTTPException(400, { message: "API key ID is required." });
    }

    const payload: RotateApiKeyRequestDto = await c.req.json();
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
