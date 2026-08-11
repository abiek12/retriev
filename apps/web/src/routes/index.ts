import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { protectedRoutes } from "./protectedRoute";
import { exceptionRoutes } from "./exceptionRoutes";

export const routes = createBrowserRouter([
  publicRoutes,
  authRoutes,
  protectedRoutes,
  exceptionRoutes,
]);
