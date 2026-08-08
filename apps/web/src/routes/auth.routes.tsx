import { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ForgotPasswordPage } from "@/features/auth/pages/forgot-password-page";
import { ResetPasswordPage } from "@/features/auth/pages/reset-password";
import { LoginPage } from "@/features/auth/pages/login-page";
import { RegisterPage } from "@/features/auth/pages/register-page";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
  ],
};
