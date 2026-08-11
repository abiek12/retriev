import ProtectedLayout from "@/layouts/ProtectedLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import type { RouteObject } from "react-router-dom";

export const protectedRoutes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
  ],
};
