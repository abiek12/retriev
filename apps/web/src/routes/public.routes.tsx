import { PublicLayout } from "@/layouts/PublicLayout";
import { LandingPage } from "@/pages/LandingPage";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <LandingPage />,
    },
  ],
};
