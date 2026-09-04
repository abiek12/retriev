import ProtectedLayout from "@/layouts/ProtectedLayout";
import { AgentPage } from "@/pages/AgentPage";
import { ConversationsPage } from "@/pages/ConversationsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { IntegrationsPage } from "@/pages/IntegrationsPage";
import { KnowledgeBasePage } from "@/pages/KnowledgeBasePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { UsagePage } from "@/pages/UsagePage";
import type { RouteObject } from "react-router-dom";

export const protectedRoutes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/agent",
      element: <AgentPage />,
    },
    {
      path: "/knowledge-base",
      element: <KnowledgeBasePage />,
    },
    {
      path: "/conversations",
      element: <ConversationsPage />,
    },
    {
      path: "/usage",
      element: <UsagePage />,
    },
    {
      path: "/integrations",
      element: <IntegrationsPage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
  ],
};
