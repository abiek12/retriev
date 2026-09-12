import type { IBaseService } from "../../core/services";

export interface IAuthService extends IBaseService {
  handler(request: Request): Promise<Response>;
}
