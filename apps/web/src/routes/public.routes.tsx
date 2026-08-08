import { PublicLayout } from "@/layouts/PublicLayout";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <PublicLayout />,
    },
  ],
};
