import { authClient } from "@/lib/authClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmailVeificationResult } from "../components/EmailVerificationResult";
import { EmailVerificationStatus } from "../types/auth";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<EmailVerificationStatus>("loading");

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

      if (error) {
        console.log("Error on email verification:", error);
        setStatus("error");
        return;
      }

      setStatus("success");
    };

    verify();
  }, [token]);

  switch (status) {
    case "loading":
      return <EmailVeificationResult status={status} />;
    case "error":
      return <EmailVeificationResult status={status} />;
    case "success":
      return <EmailVeificationResult status={status} />;
    default:
      return <EmailVeificationResult status={status} />;
  }
};
