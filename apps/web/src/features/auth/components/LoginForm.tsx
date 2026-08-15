import { Controller, useForm } from "react-hook-form";
import { loginRequestSchema, LoginRequest } from "@repo/shared/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { GoogleLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const handleFormSubmit = async (data: LoginRequest) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: `${import.meta.env.VITE_CLIENT_URL}/dashboard`,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
      setAuthError("Something went wrong. Please try again.");
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
      setAuthError(
        `Unable to continue with ${
          provider === "google" ? "Google" : "GitHub"
        }.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md min-w-md rounded-xl border bg-surface-container-lowest p-8 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Retriev</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome Back</p>
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
                placeholder="you@example.com"
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
                  autoComplete="current-password"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  className="p-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

        <div className="flex items-center justify-between my-4">
          {/*Remember me*/}
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                  disabled={isLoading}
                />

                <FieldLabel htmlFor="password">Remember me</FieldLabel>
              </div>
            )}
          />

          {/*Forgot Password*/}
          <Controller
            name="password"
            control={form.control}
            render={() => (
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Forgot Password?
              </Link>
            )}
          />
        </div>

        {/* Authentication Error */}
        {authError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {authError}
          </div>
        )}

        {/* Login button */}
        <Button
          type="submit"
          className="w-full cursor-pointer my-2 py-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-between gap-2">
              <Spinner />
              <p>logging in</p>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-muted-foreground">Or continue with</span>

        <div className="h-px flex-1 bg-border" />
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

        {/* Register */}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
