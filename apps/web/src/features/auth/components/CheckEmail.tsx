import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

export const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface-container-lowest p-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-container">
          <Mail className="size-6 text-on-surface" />
        </div>

        <h1 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
          Check your email
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We've sent a verification link to
        </p>

        <p className="mt-1 text-sm font-medium text-foreground">{email}</p>

        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-6 w-full py-5 cursor-pointer">
            Open Mail App
          </Button>
        </a>

        {/*<div className="mt-4 flex items-center justify-center gap-3 text-xs">
          <button className="text-muted-foreground hover:text-foreground cursor-pointer">
            Resend email
          </button>

          <span className="text-border">•</span>

          <button className="text-muted-foreground hover:text-foreground cursor-pointer">
            Change email
          </button>
        </div>*/}

        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Didn't receive the email? Check your spam folder or contact support if
          the issue persists.
        </p>
      </div>
    </main>
  );
};
