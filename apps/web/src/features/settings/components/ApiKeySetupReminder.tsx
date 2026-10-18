import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiKeyKeys, useApiKeys } from "../hooks/useApiKeys";

export const ApiKeySetupReminder = () => {
  const { user, session } = useCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [shouldCheck, setShouldCheck] = useState(false);

  useEffect(() => {
    if (!user || !session) return;
    const pendingKey = `api-key-reminder-pending:${user.id}`;
    if (
      searchParams.get("login") !== "success" &&
      sessionStorage.getItem(pendingKey) !== "true"
    )
      return;
    sessionStorage.removeItem(pendingKey);

    const storageKey = `api-key-reminder:${user.id}`;
    const alreadyChecked = sessionStorage.getItem(storageKey) === session.id;
    sessionStorage.setItem(storageKey, session.id);

    if (searchParams.get("login") === "success") {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("login");
      setSearchParams(nextParams, { replace: true });
    }

    if (!alreadyChecked) {
      // A new login needs fresh data, not a cached result from an earlier login.
      queryClient.removeQueries({
        queryKey: apiKeyKeys.list(user.id),
        exact: true,
      });
      setShouldCheck(true);
    }
  }, [user, session, searchParams, setSearchParams, queryClient]);

  return shouldCheck ? (
    <ApiKeySetupCheck onDone={() => setShouldCheck(false)} />
  ) : null;
};

const ApiKeySetupCheck = ({ onDone }: { onDone: () => void }) => {
  const keysQuery = useApiKeys();
  const navigate = useNavigate();
  const checked = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (checked.current || keysQuery.isPending || keysQuery.isFetching) return;
    checked.current = true;

    if (
      keysQuery.isSuccess &&
      !keysQuery.data.data.some((key) => !key.isPlatform)
    ) {
      setOpen(true);
    } else {
      onDone();
    }
  }, [
    keysQuery.isPending,
    keysQuery.isFetching,
    keysQuery.isSuccess,
    keysQuery.data,
    onDone,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onDone();
      }}
    >
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="pr-6">
          <DialogTitle className="mb-1 text-xl">Connect your LLM</DialogTitle>
          <DialogDescription>
            Add your own LLM API keys to use your preferred text provider and
            enable embeddings. You can continue with the shared Groq default for
            text generation.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onDone}>
            Maybe later
          </Button>
          <Button
            onClick={() => {
              onDone();
              navigate("/settings", { state: { openApiKeys: true } });
            }}
          >
            Go to Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
