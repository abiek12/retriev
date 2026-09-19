import { BaseService } from "../../core/services";
import { auth } from "./auth.module";
import { IAuthRepository, IAuthService } from "./types";

class AuthService extends BaseService<IAuthRepository> implements IAuthService {
  handler = async (request: Request): Promise<Response> => {
    return auth.handler(request);
  };
}

export default AuthService;
