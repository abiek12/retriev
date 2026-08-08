import DashboardLayout from "@/layouts/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import type { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject = {
  element: <DashboardLayout />,
  children: [
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
  ],
};
