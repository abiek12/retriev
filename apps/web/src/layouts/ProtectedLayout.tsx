import { AppLoader } from "@/components/common/AppLoader";
import { AppHeader } from "@/components/header/AppHeader";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <AppLoader label="Loading your workspace..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="min-h-0 flex-1 px-8 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
