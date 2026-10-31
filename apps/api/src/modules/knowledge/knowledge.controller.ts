import type { Context } from "hono";
import type { IKnowledgeService } from "./types";
import { ApiResponse } from "@/common/utils";
import {
  CreateKnowledgeRequestDto,
  KnowledgeListRequestDto,
  updateKnowledgeRequestSchema,
} from "@repo/shared";

class KnowledgeController {
  constructor(private knowledgeService: IKnowledgeService) {}

  create = async (c: Context) => {
    const userId: string = c.get("userId");
    const payload: CreateKnowledgeRequestDto = await c.req.json();

    const result = await this.knowledgeService.create(userId, payload);

    return c.json(ApiResponse.success(result), 201);
  };

  list = async (c: Context, query: KnowledgeListRequestDto) => {
    const userId = c.get("userId");
    const result = await this.knowledgeService.list(userId, query);

    return c.json(ApiResponse.success(result));
  };

  getById = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");

    if (!id) {
      throw new Error("Knowledge base ID is required");
    }

    const result = await this.knowledgeService.getById(id, userId);

    return c.json(ApiResponse.success(result));
  };

  update = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    const payload = await c.req.json();

    if (!id) {
      throw new Error("Knowledge base ID is required");
    }

    const validatedPayload = updateKnowledgeRequestSchema.parse(payload);

    const result = await this.knowledgeService.update(
      id,
      userId,
      validatedPayload,
    );

    return c.json(ApiResponse.success(result));
  };

  delete = async (c: Context) => {
    const userId = c.get("userId");

    const id = c.req.param("id");

    if (!id) {
      throw new Error("Knowledge base ID is required");
    }

    await this.knowledgeService.delete(id, userId);

    return c.json(ApiResponse.success(null));
  };

  completeFileUpload = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");

    if (!id) {
      throw new Error("Knowledge base Id is required!");
    }

    const result = await this.knowledgeService.completeFileUpload(id, userId);

    return c.json(ApiResponse.success(result), 202);
  };
}

export default KnowledgeController;
