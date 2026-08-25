import { Button } from "@/components/ui/button";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { EmailVerificationStatus } from "../types/auth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";

export const EmailVeificationResult = (props) => {
  const status = props.status as EmailVerificationStatus;
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <Loader2 className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md min-w-md rounded-xl border border-border bg-surface-container-lowest px-8 py-14 text-center">
        {/* Icon */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-container">
          {status === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : status === "success" ? (
            <Check className="size-6 text-on-surface" />
          ) : (
            <TriangleAlert className="size-6 text-on-surface" />
          )}
        </div>

        <h1 className="mt-8 font-heading text-3xl font-semibold tracking-tight">
          {status === "loading" && "Verifying email..."}
          {status === "success" && "Email verified!"}
          {status === "error" && "Verification failed."}
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">
          {status === "loading" &&
            "Just a moment, we're verifying your email..."}
          {status === "success" &&
            "Success! Your account is now ready. Let's build some agents."}
          {status === "error" &&
            "Oops! Something went wrong with the verification."}
        </p>

        {isAuthenticated ? (
          <Button
            disabled={status === "error" || status === "loading"}
            className="mt-8 w-full py-5 cursor-pointer"
          >
            <Link to="/dashboard">Continue to Dashboard</Link>
          </Button>
        ) : (
          <Button
            disabled={status === "error" || status === "loading"}
            className="mt-8 w-full py-5 cursor-pointer"
          >
            <Link to="/login">Continue to Login</Link>
          </Button>
        )}
      </div>
    </main>
  );
};
