import LoginCard from "../components/LoginCard";
import { authClient } from "@/lib/authClient";

export const LoginPage = () => {
  console.log(authClient);
  return (
    <div>
      <LoginCard />
    </div>
  );
};
