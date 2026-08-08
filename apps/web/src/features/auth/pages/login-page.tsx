import LoginCard from "../components/LoginCard";
import { authClient } from "@/lib/auth-client";

export const LoginPage = () => {
  console.log(authClient);
  return (
    <div>
      <LoginCard />
    </div>
  );
};
