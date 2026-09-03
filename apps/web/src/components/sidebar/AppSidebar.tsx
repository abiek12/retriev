import {
  BarChart3,
  Bot,
  Database,
  LayoutDashboard,
  MessageSquare,
  Puzzle,
  Settings,
} from "lucide-react";
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
    <div className="w-xs h-full flex flex-col bg-sidebar p-6 select-none">
      <div className="header flex items-center justify-start gap-2 w-full my-2">
        <div className="logo cursor-pointer">
          <svg
            viewBox="0 0 120 120"
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="slit-cutout-black">
                <rect width="120" height="120" fill="white" />
                <path
                  d="M -10 60 L 46 60 A 14 14 0 0 1 60 74 L 60 130"
                  stroke="black"
                  stroke-width="7"
                  fill="none"
                  stroke-linecap="butt"
                />
              </mask>
            </defs>

            <g fill="#000000" mask="url(#slit-cutout-black)">
              <rect x="51" y="10" width="14" height="100" rx="1" />
              <rect x="10" y="51" width="100" height="14" rx="1" />
              <rect
                x="51"
                y="10"
                width="14"
                height="100"
                rx="1"
                transform="rotate(45 60 60)"
              />
              <rect
                x="51"
                y="10"
                width="14"
                height="100"
                rx="1"
                transform="rotate(-45 60 60)"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight font-heading">
          Retriev
        </h1>
      </div>

      <nav className="my-6 flex flex-col gap-1">
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
