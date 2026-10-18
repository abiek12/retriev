import { Button } from "@/components/ui/button";
import { KeyRound, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  CreateApiKeyRequestDto,
  RotateApiKeyRequestDto,
} from "@repo/shared";
import {
  useApiKeys,
  useCreateApiKey,
  useDeleteApiKey,
  useRotateApiKey,
} from "../hooks/useApiKeys";
import {
  apiKeyTypes,
  providerLabel,
  type ApiKeyConfigurations,
  type ApiKeyType,
} from "../types";
import { ApiKeyModal } from "./ApiKeyModal";

export const ApiKeySettings = () => {
  const keysQuery = useApiKeys();
  const createMutation = useCreateApiKey();
  const rotateMutation = useRotateApiKey();
  const deleteMutation = useDeleteApiKey();

  const configurations: ApiKeyConfigurations = { text: null, embedding: null };
  for (const record of keysQuery.data?.data ?? []) {
    if (!record.isPlatform) configurations[record.type] ??= record;
  }

  const isPending =
    createMutation.isPending ||
    rotateMutation.isPending ||
    deleteMutation.isPending;
  const loadError = keysQuery.isError
    ? "Could not load API keys. Please try again."
    : null;
  const canManage = !keysQuery.isPending && !keysQuery.isError && !isPending;
  const [modalType, setModalType] = useState<ApiKeyType | null>(null);

  const handleSave = async (payload: CreateApiKeyRequestDto) => {
    try {
      await createMutation.mutateAsync(payload);
      toast.success("API key saved.");
    } finally {
      // Detach mutation variables so submitted secrets are not retained in cache.
      createMutation.reset();
    }
  };

  const handleRotate = async (id: string, payload: RotateApiKeyRequestDto) => {
    try {
      await rotateMutation.mutateAsync({ id, payload });
      toast.success("API key rotated.");
    } finally {
      rotateMutation.reset();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("API key deleted.");
    } finally {
      deleteMutation.reset();
    }
  };

  return (
    <section
      aria-labelledby="api-keys-title"
      className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="api-keys-title" className="text-base font-semibold">
            API Keys
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect your providers for text generation and embeddings.
          </p>
        </div>
        <Button
          className="p-5"
          disabled={!canManage}
          onClick={() => setModalType("text")}
        >
          <KeyRound aria-hidden="true" />
          Manage API keys
        </Button>
      </div>

      {loadError && (
        <div
          role="alert"
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          <p>{loadError}</p>
          <Button
            variant="outline"
            disabled={keysQuery.isFetching}
            onClick={() => void keysQuery.refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      <div
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        aria-busy={keysQuery.isPending}
      >
        {apiKeyTypes.map(({ value, label }) => {
          const configuration = configurations[value];
          return (
            <button
              key={value}
              type="button"
              disabled={!canManage}
              onClick={() => setModalType(value)}
              aria-haspopup="dialog"
              aria-label={`Manage ${label.toLowerCase()} API key`}
              className="min-w-0 rounded-lg border bg-surface-container-low px-4 py-4 text-left transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="block text-sm font-medium">{label}</span>
              <span
                className={`mt-1.5 block break-all text-xs leading-relaxed ${configuration ? "font-mono" : "text-muted-foreground"}`}
              >
                {keysQuery.isPending
                  ? "Loading..."
                  : loadError && !configuration
                    ? "Unavailable"
                    : configuration
                      ? `${providerLabel(configuration.provider)} / ${configuration.model}`
                      : "Not configured"}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <LockKeyhole aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        Your API keys are encrypted and stored securely.
      </p>

      {modalType && (
        <ApiKeyModal
          initialType={modalType}
          configurations={configurations}
          isPending={isPending}
          loadError={loadError}
          isRefreshing={keysQuery.isFetching}
          onRetry={() => void keysQuery.refetch()}
          onClose={() => setModalType(null)}
          onSave={handleSave}
          onRotate={handleRotate}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
};
