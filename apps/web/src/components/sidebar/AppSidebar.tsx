import {
  BarChart3,
  Bot,
  Database,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  Puzzle,
  Settings,
} from "lucide-react";
import { RetrievLogo } from "@/components/common/RetrievLogo";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Agents",
    icon: Bot,
    path: "/agent",
  },
  {
    label: "Knowledge Base",
    icon: Database,
    path: "/knowledge-base",
  },
  {
    label: "Conversations",
    icon: MessageSquare,
    path: "/conversations",
  },
  {
    label: "Usage",
    icon: BarChart3,
    path: "/usage",
  },
  {
    label: "Integrations",
    icon: Puzzle,
    path: "/integrations",
  },
];

type AppSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  return (
    <>
      {!collapsed && (
        <>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onToggle}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />
          <div aria-hidden="true" className="w-16 shrink-0 lg:hidden" />
        </>
      )}
      <aside
        className={`${collapsed ? "relative w-16 lg:w-16 lg:px-2" : "fixed inset-y-0 left-0 z-50 w-72 lg:static lg:inset-auto lg:z-auto lg:w-64 xl:w-xs lg:px-4"} shrink-0 h-full flex flex-col bg-sidebar px-2 py-5 select-none border-r transition-[width] duration-200`}
      >
        <div
          className={`header flex items-center gap-2 w-full my-2 ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="hidden w-full items-center justify-between gap-2 lg:flex">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={onToggle}
                      aria-label="Expand sidebar"
                      className="group relative mx-auto flex size-10 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:size-8"
                    />
                  }
                >
                  <RetrievLogo className="size-8 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0" />
                  <PanelLeft
                    aria-hidden="true"
                    className="absolute size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">Expand sidebar</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-2">
                  <RetrievLogo className="size-8 shrink-0" />
                  <h1 className="text-2xl font-semibold tracking-tight font-heading">
                    Retriev
                  </h1>
                </div>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={onToggle}
                        aria-label="Collapse sidebar"
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    }
                  >
                    <PanelLeft aria-hidden="true" className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Collapse sidebar</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>

          <div className="flex w-full items-center justify-center lg:hidden">
            {!collapsed ? (
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <RetrievLogo className="size-8 shrink-0" />
                  <h1 className="text-2xl font-semibold tracking-tight font-heading">
                    Retriev
                  </h1>
                </div>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={onToggle}
                        aria-label="Collapse sidebar"
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    }
                  >
                    <PanelLeft aria-hidden="true" className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Collapse sidebar</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={onToggle}
                      aria-label="Expand sidebar"
                      className="group relative flex size-10 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  }
                >
                  <RetrievLogo className="size-8 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0" />
                  <PanelLeft
                    aria-hidden="true"
                    className="absolute size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">Expand sidebar</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <nav className="my-5 flex flex-col gap-1">
          {navigation.map(({ label, icon: Icon, path }) => (
            <Tooltip key={label} disabled={!collapsed}>
              <TooltipTrigger
                render={
                  <NavLink
                    to={path}
                    aria-label={label}
                    className={({ isActive }) =>
                      `flex gap-3 items-center ${collapsed ? "justify-center" : "justify-start"} p-3 cursor-pointer rounded-sm transition-colors ${
                        isActive
                          ? "bg-surface-dim text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`
                    }
                  />
                }
              >
                <Icon className="size-5 shrink-0" strokeWidth={1.8} />
                <span className={collapsed ? "hidden" : "inline"}>{label}</span>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <div className="mt-auto">
          <Tooltip disabled={!collapsed}>
            <TooltipTrigger
              render={
                <NavLink
                  to={"/settings"}
                  aria-label="Settings"
                  className={({ isActive }) =>
                    `cursor-pointer flex gap-3 p-3 items-center ${collapsed ? "justify-center" : "justify-start"} rounded-sm text-sidebar-accent-foreground ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`
                  }
                />
              }
            >
              <Settings className="size-5 shrink-0" strokeWidth={1.8} />
              <span className={collapsed ? "hidden" : "inline"}>Settings</span>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};
