import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Outlet />
    </div>
  );
};
