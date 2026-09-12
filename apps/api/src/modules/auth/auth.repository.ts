import { BaseRepository } from "../../core/repositories";
import type { IAuthRepository } from "./auth.repository.interface";

class AuthRepository extends BaseRepository implements IAuthRepository {}

export default AuthRepository;
