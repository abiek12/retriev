import { MessageSquare } from "lucide-react";

export const ConversationsPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <MessageSquare className="mx-auto mb-4 size-10 text-muted-foreground" />

        <h1 className="text-xl font-semibold">
          Conversations are under development
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We're working on something powerful. The Conversations workspace will
          be available soon.
        </p>
      </div>
    </div>
  );
};
