import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { RegisterRequest, registerRequestSchema } from "@repo/shared/contracts";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleFormSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        name: data.name,
        password: data.confirmPassword,
        callbackURL: `${import.meta.env.VITE_CLIENT_URL}/dashboard`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${import.meta.env.VITE_CLIENT_URL}/dashboard`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error: any) {
      toast.error("Unable to continue with social login.");
      setError(
        `Unable to continue with ${
          provider === "google" ? "Google" : "GitHub"
        }.`,
      );
    }
  };

  return (
    <div className="w-full max-w-md min-w-md rounded-xl border bg-background p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Retriev</h1>
        {/* sub-title */}
        <div className="my-4 space-y-2">
          <h2 className="text-xl font-medium tracking-tight">
            Create your workspace
          </h2>
          <p className="text-sm text-muted-foreground">
            Setup your AI environment in seconds
          </p>
        </div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer py-4"
          disabled={isLoading}
          onClick={() => handleSocialLogin("google")}
        >
          <GoogleLogoIcon size={32} weight="bold" />
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer py-4"
          disabled={isLoading}
          onClick={() => handleSocialLogin("github")}
        >
          <GithubLogoIcon size={32} weight="bold" />
          Continue with GitHub
        </Button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-muted-foreground">
          Or register with email
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Form */}
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        {/* Username */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <input
                {...field}
                id="username"
                type="text"
                placeholder="John Doe"
                autoComplete="username"
                disabled={isLoading}
                aria-invalid={fieldState.invalid}
                className="p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  placeholder="********"
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
                  placeholder="********"
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

        {/* Terms of services and privacy policy accept */}
        <Controller
          name="acceptTerms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="accept-terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                />

                <label
                  htmlFor="accept-terms"
                  className="cursor-pointer text-sm text-muted-foreground"
                >
                  I accept the{" "}
                  <Link to="/terms" className="text-foreground hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-foreground hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Register button */}
        <Button
          type="submit"
          className="w-full cursor-pointer my-2 py-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-between gap-2">
              <Spinner />
              <p>Creating...</p>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Login redirect */}
      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;
