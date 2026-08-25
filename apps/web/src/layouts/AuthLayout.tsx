import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <Loader2 className="animate-spin size-12" />
    </div>;
  }

  const isEmailVerificationPage = location.pathname === "/verify-email/confirm";

  if (isAuthenticated && !isEmailVerificationPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Outlet />
    </div>
  );
};
