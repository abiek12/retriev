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

    const res = await this.knowledgeService.create(userId, payload);

    return c.json(ApiResponse.success(res));
  };

  list = async (c: Context, query: KnowledgeListRequestDto) => {
    const userId = c.get("userId");
    const res = await this.knowledgeService.list(userId, query);

    return c.json(ApiResponse.success(res));
  };

  getById = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");

    if (!id) {
      throw new Error("Knowledge base ID is required");
    }

    const agent = await this.knowledgeService.getById(id, userId);

    return c.json(ApiResponse.success(agent));
  };

  update = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    const payload = await c.req.json();

    if (!id) {
      throw new Error("Agent ID is required");
    }

    const validatedPayload = updateKnowledgeRequestSchema.parse(payload);

    const agent = await this.knowledgeService.update(
      id,
      userId,
      validatedPayload,
    );

    return c.json(ApiResponse.success(agent));
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

    const result = await this.knowledgeService.completeFileUpload(userId, id);

    return c.json(ApiResponse.success(result), 202);
  };
}

export default KnowledgeController;
