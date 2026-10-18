import { Button } from "@/components/ui/button";
import { KeyRound, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { previewApiKeys } from "../data/preview-api-keys";
import {
  apiKeyTypes,
  providerLabel,
  type ApiKeyConfigurations,
  type ApiKeyPreviewInput,
  type ApiKeyType,
} from "../types";
import { ApiKeyModal } from "./ApiKeyModal";

export const ApiKeySettings = () => {
  const [configurations, setConfigurations] =
    useState<ApiKeyConfigurations>(previewApiKeys);
  const [modalType, setModalType] = useState<ApiKeyType | null>(null);

  const handleSave = (type: ApiKeyType, input: ApiKeyPreviewInput) => {
    const now = new Date().toISOString();
    setConfigurations((current) => ({
      ...current,
      [type]: {
        id: crypto.randomUUID(),
        type,
        ...input,
        isPlatform: false,
        createdAt: now,
        updatedAt: now,
      },
    }));
    toast.info("Preview updated. No API key was saved or validated.");
  };

  const handleRotate = (type: ApiKeyType) => {
    setConfigurations((current) => ({
      ...current,
      [type]: current[type]
        ? { ...current[type], updatedAt: new Date().toISOString() }
        : null,
    }));
    toast.info("Rotation preview complete. No API key was changed.");
  };

  const handleDelete = (type: ApiKeyType) => {
    setConfigurations((current) => ({ ...current, [type]: null }));
    toast.info("Configuration removed from the preview.");
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
        <Button className="p-5" onClick={() => setModalType("text")}>
          <KeyRound aria-hidden="true" />
          Manage API keys
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {apiKeyTypes.map(({ value, label }) => {
          const configuration = configurations[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => setModalType(value)}
              aria-haspopup="dialog"
              aria-label={`Manage ${label.toLowerCase()} API key`}
              className="min-w-0 rounded-lg border bg-surface-container-low px-4 py-4 text-left transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="block text-sm font-medium">{label}</span>
              <span
                className={`mt-1.5 block break-all text-xs leading-relaxed ${configuration ? "font-mono" : "text-muted-foreground"}`}
              >
                {configuration
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
          onClose={() => setModalType(null)}
          onSave={handleSave}
          onRotate={handleRotate}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
};
