import { IBaseService } from "@/core/services";
import {
  CreateApiKeyRequestDto,
  CreateApiKeyResponseDto,
  GetApiKeyRequestDto,
  GetApiKeyResponseDto,
  RotateApiKeyRequestDto,
  RotateApiKeyResponseDto,
} from "@repo/shared";

export interface IApiKeyService extends IBaseService {
  create(
    userId: string,
    data: CreateApiKeyRequestDto,
  ): Promise<CreateApiKeyResponseDto>;

  list(
    userId: string,
    data: GetApiKeyRequestDto,
  ): Promise<GetApiKeyResponseDto>;

  rotate(
    id: string,
    userId: string,
    data: RotateApiKeyRequestDto,
  ): Promise<RotateApiKeyResponseDto>;

  delete(id: string, userId: string): Promise<void>;
}
