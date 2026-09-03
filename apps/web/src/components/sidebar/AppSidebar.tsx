import {
  BarChart3,
  Bot,
  Database,
  LayoutDashboard,
  MessageSquare,
  Puzzle,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Agents",
    icon: Bot,
    active: true,
  },
  {
    label: "Knowledge Base",
    icon: Database,
  },
  {
    label: "Conversations",
    icon: MessageSquare,
  },
  {
    label: "Usage",
    icon: BarChart3,
  },
  {
    label: "Integrations",
    icon: Puzzle,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export const AppSidebar = () => {
  return (
    <div className="w-xs h-full flex flex-col bg-sidebar p-6">
      <div className="header flex items-center justify-start gap-3 w-full py-3">
        <div className="logo">R</div>
        <h1>Retriev</h1>
      </div>

      <nav className="my-6 flex flex-col gap-1">
        {navigation.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={`flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm transition-colors ${
              active
                ? "bg-surface-dim text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.8} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};
