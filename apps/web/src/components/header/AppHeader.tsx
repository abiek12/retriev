import { Bell, CircleHelp, Search, Square, SquareMenu } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserMenu } from "./UserMenu";

export const AppHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-8">
      <div className="flex w-full items-center justify-between gap-6">
        {/* Search */}
        <div className="relative w-full max-w-115">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <Input
            type="search"
            placeholder="Search across knowledge base..."
            className="h-10 pl-9"
          />
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            aria-label="Help"
          >
            <CircleHelp className="h-5 w-5" />
          </Button>

          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            aria-label="Applications"
          >
            <SquareMenu className="h-5 w-5" />
          </Button>

          {/* Drop down menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
