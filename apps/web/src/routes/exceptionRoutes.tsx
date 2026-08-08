import { ExceptionLayout } from "@/layouts/ExceptionLayout";
import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MaintenancePage } from "@/pages/MaintenancePage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";

export const exceptionRoutes: RouteObject = {
  element: <ExceptionLayout />,
  children: [
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/maintenance",
      element: <MaintenancePage />,
    },
    {
      path: "/coming-soon",
      element: <ComingSoonPage />,
    },
  ],
};
