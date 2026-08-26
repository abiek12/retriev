import { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { VerifyEmailPage } from "@/features/auth/pages/VerifyEmailPage";
import { CheckEmailPage } from "@/features/auth/pages/CheckEmailPage";

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
    {
      path: "/verify-email",
      element: <CheckEmailPage />,
    },
    {
      path: "/verify-email/confirm",
      element: <VerifyEmailPage />,
    },
  ],
};
