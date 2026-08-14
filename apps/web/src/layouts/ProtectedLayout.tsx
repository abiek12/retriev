import { AppHeader } from "@/components/header/AppHeader";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <AppHeader />
      <AppSidebar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
