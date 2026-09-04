import { Plug } from "lucide-react";

export const IntegrationsPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <Plug className="mx-auto mb-4 size-10 text-muted-foreground" />

        <h1 className="text-xl font-semibold">
          Integrations are under development
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We're working on something powerful. The Integrations workspace will
          be available soon.
        </p>
      </div>
    </div>
  );
};
