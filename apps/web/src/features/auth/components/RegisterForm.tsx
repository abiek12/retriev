import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterRequest, registerSchema } from "@repo/shared/contracts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
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
    <div>
      <h1>Register</h1>
    </div>
  );
};

export default RegisterCard;
