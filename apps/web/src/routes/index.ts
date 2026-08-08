import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { exceptionRoutes } from "./exceptionRoutes";

export const routes = createBrowserRouter([
  publicRoutes,
  authRoutes,
  dashboardRoutes,
  exceptionRoutes,
]);
