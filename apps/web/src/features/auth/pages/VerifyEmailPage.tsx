import { authClient } from "@/lib/authClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

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
      return <div>Loading...</div>;
    case "error":
      return <div>Error while verifying email</div>;
    case "success":
      return <div>Email verified!</div>;
    default:
      return <div>Go to login page</div>;
  }
};
