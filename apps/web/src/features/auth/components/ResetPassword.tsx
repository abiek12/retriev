import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordRequest,
  resetPasswordSchema,
} from "@repo/shared/contracts";
import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password rules
  const PASSWORD_MIN_LENGTH = 8;
  const passwordRequirements = {
    minLength: (password: string) => password.length >= PASSWORD_MIN_LENGTH,

    hasNumber: (password: string) => /\d/.test(password),

    hasSpecialCharacter: (password: string) => /[^A-Za-z0-9]/.test(password),

    hasUpperAndLowerCase: (password: string) =>
      /[a-z]/.test(password) && /[A-Z]/.test(password),
  };

  // Form
  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
  });

  const handleFormSubmit = async (data: ResetPasswordRequest) => {
    // Send reset link to mail
    setIsLoading(true);
    try {
      setIsLoading(true);

      toast.success("Password reset email sent.");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  return (
    <div className="w-full max-w-md min-w-md rounded-xl border bg-surface-container-lowest p-8 shadow-sm">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Retriev</h1>
        {/* sub-title */}
        <div className="my-4 space-y-2">
          <h2 className="text-xl font-medium tracking-tight">
            Set a new password
          </h2>
          <p className="text-sm text-muted-foreground">
            Please choose a strong password to secure your account.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative border border-gray-300 rounded-sm focus:outline-none focus:ring-0">
                <input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  className="p-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>

              <div className="relative border border-gray-300 rounded-sm focus:outline-none focus:ring-0">
                <input
                  {...field}
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  className="p-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Update password button */}
        <Button
          type="submit"
          className="w-full cursor-pointer my-2 py-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-between gap-2">
              <Spinner />
              <p>Updating...</p>
            </div>
          ) : (
            "Update Password"
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
