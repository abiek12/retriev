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
    <div
      className={`shrink-0 h-full flex flex-col bg-sidebar px-2 py-5 select-none border-r transition-[width] duration-200 ${collapsed ? "w-16" : "w-16 lg:w-64 xl:w-xs"} lg:px-4`}
    >
      <div className="header flex items-center justify-center lg:justify-between gap-2 w-full my-2">
        <div className="flex gap-2">
          <div className="logo cursor-pointer">
            <RetrievLogo className="size-8" />
          </div>
          <h1 className="hidden text-2xl font-semibold tracking-tight font-heading lg:block">
            Retriev
          </h1>
        </div>

        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onToggle}
        >
          <PanelLeft aria-hidden="true" className="size-5" />
        </button>
      </div>

      <nav className="my-5 flex flex-col gap-1">
        {navigation.map(({ label, icon: Icon, path }) => (
          <NavLink
            to={path}
            key={label}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              `flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm transition-colors ${
                isActive
                  ? "bg-surface-dim text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`
            }
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.8} />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <NavLink
          to={"/settings"}
          aria-label="Settings"
          title="Settings"
          className={({ isActive }) =>
            `cursor-pointer flex gap-3 p-3 items-center justify-start rounded-sm text-sidebar-accent-foreground ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`
          }
        >
          <Settings className="size-5 shrink-0" strokeWidth={1.8} />
          <span className="hidden lg:inline">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
