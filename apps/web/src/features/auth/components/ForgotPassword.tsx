import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordRequest,
} from "@repo/shared/contracts";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async () => {
    // Send reset link to mail
  };

  return (
    <div className="w-full max-w-md min-w-md rounded-xl border bg-surface-container-lowest p-8 shadow-sm">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Retriev</h1>
        {/* sub-title */}
        <div className="my-4 space-y-2">
          <h2 className="text-xl font-medium tracking-tight">
            Reset your password
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                {...field}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                autoComplete="email"
                disabled={isLoading}
                aria-invalid={fieldState.invalid}
                className="p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Send reset link button */}
        <Button
          type="submit"
          className="w-full cursor-pointer my-2 py-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-between gap-2">
              <Spinner />
              <p>Sending...</p>
            </div>
          ) : (
            "Sent Reset Link"
          )}
        </Button>
      </form>

      {/* Login redirect */}
      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer py-4 my-2"
        disabled={isLoading}
      >
        <Link
          to="/login"
          className="font-medium text-foreground flex items-center justify-between gap-2"
        >
          <MoveLeft size={32} />
          Back to login
        </Link>
      </Button>
    </div>
  );
};
