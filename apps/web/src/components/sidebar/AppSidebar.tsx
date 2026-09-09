import {
  BarChart3,
  Bot,
  Database,
  LayoutDashboard,
  MessageSquare,
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

export const AppSidebar = () => {
  return (
    <div className="w-xs h-full flex flex-col bg-sidebar px-4 py-5 select-none border-r">
      <div className="header flex items-center justify-start gap-2 w-full my-2">
        <div className="logo cursor-pointer">
          <RetrievLogo className="size-10" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight font-heading">
          Retriev
        </h1>
      </div>

      <nav className="my-5 flex flex-col gap-1">
        {navigation.map(({ label, icon: Icon, path }) => (
          <NavLink
            to={path}
            key={label}
            className={({ isActive }) =>
              `flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm transition-colors ${
                isActive
                  ? "bg-surface-dim text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`
            }
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            `cursor-pointer flex gap-3 p-3 items-center justify-start rounded-sm text-sidebar-accent-foreground ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`
          }
        >
          <Settings className="size-5 shrink-0" strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
