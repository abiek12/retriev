import LoginForm from "../components/LoginForm";
import { authClient } from "@/lib/authClient";

export const LoginPage = () => {
  console.log(authClient);
  return (
    <div>
      <LoginForm />
    </div>
  );
};
