import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";

export const routes = createBrowserRouter([
  publicRoutes,
  authRoutes,
  dashboardRoutes,
]);
