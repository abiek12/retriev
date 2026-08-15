import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/lib/authClient";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          aria-label="Open user menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User avatar" />

            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <User />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
