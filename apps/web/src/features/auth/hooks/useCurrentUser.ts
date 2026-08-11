import { authClient } from "@/lib/authClient";

export const useCurrentUser = () => {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    error,
  };
};
