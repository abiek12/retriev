import { authClient } from "@/lib/authClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmailVeificationResult } from "../components/EmailVerificationResult";
import { EmailVerificationStatus } from "../types/auth";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<EmailVerificationStatus>("loading");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      const { error } = await authClient.verifyEmail(
        {
          query: {
            token,
          },
        },
        {
          disableSignal: true,
        },
      );

      // Get the freshly-created session
      const { data: session } = await authClient.getSession();
      setIsAuthenticated(!!session);

      if (error) {
        console.log("Error on email verification:", error);
        setStatus("error");
        return;
      }

      setStatus("success");
    };

    verify();
  }, [token]);  

  return (
    <EmailVeificationResult status={status} isAuthenticated={isAuthenticated} />
  );
};
