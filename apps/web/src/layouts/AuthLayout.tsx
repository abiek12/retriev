import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (isLoading) {
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <Loader2 className="animate-spin size-12" />
    </div>;
  }

  const isEmailVerificationPage = location.pathname === "/verify-email/confirm";

  // Verification callback must have a token.
  if (isEmailVerificationPage && !token) {
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
  }

  // Authenticated users should not access normal auth pages.
  if (isAuthenticated && !isEmailVerificationPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Outlet />
    </div>
  );
};
