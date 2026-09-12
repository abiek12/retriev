import { db } from "../../infrastructure/database";
import AuthRepository from "./auth.repository";
import AuthService from "./auth.service";

const authRepository = new AuthRepository(db);

export const authService = new AuthService(authRepository);
