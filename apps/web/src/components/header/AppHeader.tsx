import { CircleHelp, Moon, Search, SquareMenu, Sun } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserMenu } from "./UserMenu";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useTheme } from "next-themes";

export const AppHeader = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const themeLabel = `Switch to ${nextTheme} theme`;
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-10">
      <div className="flex w-full items-center justify-between gap-3 sm:gap-6">
        {/* Search */}
        <div className="relative min-w-0 w-full max-w-115">
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
        <div className="flex shrink-0 items-center gap-2">
          {/*<Tooltip>
            <TooltipTrigger
              render={
                <Button
                  className="hidden cursor-pointer sm:inline-flex"
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                />
              }
            >
              <Bell className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>*/}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  className="hidden cursor-pointer sm:inline-flex"
                  variant="ghost"
                  size="icon"
                  aria-label="Help"
                />
              }
            >
              <CircleHelp className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Help</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  className="hidden cursor-pointer sm:inline-flex"
                  variant="ghost"
                  size="icon"
                  aria-label="Documentations"
                />
              }
            >
              <SquareMenu className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Documentations</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={themeLabel}
                  onClick={() => setTheme(nextTheme)}
                />
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-5" aria-hidden="true" />
              ) : (
                <Moon className="size-5" aria-hidden="true" />
              )}
            </TooltipTrigger>
            <TooltipContent side="bottom">{themeLabel}</TooltipContent>
          </Tooltip>

          {/* Drop down menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
