import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const EmailVeificationResult = ({ status }) => {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface-container-lowest px-8 py-16 text-center">
        {/* Icon */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-container">
          <Check className="size-6 text-on-surface" />
        </div>

        <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight">
          Email Verified
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">
          Your account is now ready. Let's build some agents.
        </p>

        <Button className="mt-6 w-full py-5 cursor-pointer">
          Continue to Dashboard
        </Button>
      </div>
    </main>
  );
};
