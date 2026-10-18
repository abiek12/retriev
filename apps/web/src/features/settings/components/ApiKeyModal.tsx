import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs } from "@base-ui/react/tabs";
import type {
  CreateApiKeyRequestDto,
  ErrorResponse,
  RotateApiKeyRequestDto,
} from "@repo/shared";
import { Spinner } from "@/components/ui/spinner";
import { isAxiosError } from "axios";
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  RotateCw,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { ApiKeyForm } from "./ApiKeyForm";
import {
  apiKeyTypes,
  providerLabel,
  type ApiKeyConfigurations,
  type ApiKeyType,
} from "../types";

type ApiKeyModalProps = {
  initialType: ApiKeyType;
  configurations: ApiKeyConfigurations;
  onClose: () => void;
  isPending: boolean;
  loadError: string | null;
  isRefreshing: boolean;
  onRetry: () => void;
  onSave: (input: CreateApiKeyRequestDto) => Promise<void>;
  onRotate: (id: string, input: RotateApiKeyRequestDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export const ApiKeyModal = ({
  initialType,
  configurations,
  isPending,
  loadError,
  isRefreshing,
  onRetry,
  onClose,
  onSave,
  onRotate,
  onDelete,
}: ApiKeyModalProps) => {
  const [activeType, setActiveType] = useState(initialType);
  const [view, setView] = useState<"overview" | "rotate" | "delete">(
    "overview",
  );
  const activeConfiguration = configurations[activeType];
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleting = useRef(false);

  const handleDelete = async () => {
    if (!activeConfiguration || isPending || deleting.current) return;
    deleting.current = true;
    setDeleteError(null);
    try {
      await onDelete(activeConfiguration.id);
      setView("overview");
    } catch (error) {
      setDeleteError(
        (isAxiosError<ErrorResponse>(error)
          ? error.response?.data?.error?.message
          : undefined) ?? "Could not delete the API key. Please try again.",
      );
    } finally {
      deleting.current = false;
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isPending) onClose();
      }}
    >
      <DialogContent
        showCloseButton={!isPending}
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:max-w-xl sm:p-6"
      >
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <KeyRound aria-hidden="true" className="size-5 shrink-0" />
            {view === "delete" ? "Delete API key?" : "Manage API Keys"}
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed sm:text-sm">
            {view === "delete"
              ? "Remove this saved configuration from Retriev."
              : "Configure your text and embedding providers."}
          </DialogDescription>
        </DialogHeader>

        {loadError ? (
          <div role="alert" className="space-y-4 text-sm">
            <p>{loadError}</p>
            <Button variant="outline" disabled={isRefreshing} onClick={onRetry}>
              Retry
            </Button>
          </div>
        ) : view === "delete" && activeConfiguration ? (
          <div className="space-y-5">
            <div className="rounded-lg border bg-surface-container-low p-4 text-sm leading-relaxed">
              Delete your{" "}
              <span className="font-medium">
                {providerLabel(activeConfiguration.provider)}{" "}
                {activeType === "text" ? "text generation" : "embedding"}
              </span>{" "}
              configuration?
            </div>
            {deleteError && (
              <p role="alert" className="text-sm text-destructive">
                {deleteError}
              </p>
            )}
            <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  setDeleteError(null);
                  setView("overview");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={() => void handleDelete()}
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 aria-hidden="true" />
                    Delete key
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Tabs.Root
            value={activeType}
            onValueChange={(value) => {
              if (!isPending && (value === "text" || value === "embedding")) {
                setActiveType(value);
                setView("overview");
                setDeleteError(null);
              }
            }}
          >
            <Tabs.List
              aria-label="API key category"
              className="grid grid-cols-2 gap-1 rounded-lg bg-surface-container-low p-1"
            >
              {apiKeyTypes.map(({ value, label }) => (
                <Tabs.Tab
                  key={value}
                  value={value}
                  disabled={isPending}
                  className="flex min-h-10 min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md px-2 py-2 text-xs font-medium text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring data-active:bg-background data-active:text-foreground data-active:shadow-xs sm:text-sm"
                >
                  {label}
                  <span className="text-[10px] font-normal text-muted-foreground">
                    {configurations[value] ? "Configured" : "Empty"}
                  </span>
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {apiKeyTypes.map(({ value }) => {
              const configuration = configurations[value];
              return (
                <Tabs.Panel
                  key={value}
                  value={value}
                  className="mt-5 outline-none"
                >
                  {configuration && view === "overview" ? (
                    <div className="space-y-5">
                      <div className="space-y-5 rounded-lg border bg-surface-container-low p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold">
                              {providerLabel(configuration.provider)}
                            </p>
                            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                              {configuration.model}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Added{" "}
                            {new Date(
                              configuration.createdAt,
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-medium text-muted-foreground">
                            Stored API key
                          </p>
                          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs">
                            <CheckCircle2
                              aria-hidden="true"
                              className="size-4 shrink-0 text-muted-foreground"
                            />
                            <span>API key saved</span>
                            <LockKeyhole
                              aria-hidden="true"
                              className="ml-auto size-3.5 text-muted-foreground"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Button
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          disabled={isPending}
                          onClick={() => {
                            setDeleteError(null);
                            setView("delete");
                          }}
                        >
                          <Trash2 aria-hidden="true" />
                          Delete key
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={isPending}
                          onClick={() => setView("rotate")}
                        >
                          <RotateCw aria-hidden="true" />
                          Rotate key
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <ApiKeyForm
                      key={`${value}-${view}`}
                      type={value}
                      configuration={view === "rotate" ? configuration : null}
                      isPending={isPending}
                      onSave={async (input) => {
                        await onSave(input);
                        setView("overview");
                      }}
                      onRotate={async (input) => {
                        if (!configuration)
                          throw new Error(
                            "API key not found. Please refresh and try again.",
                          );
                        await onRotate(configuration.id, input);
                        setView("overview");
                      }}
                      onCancel={() => {
                        if (view === "rotate") setView("overview");
                        else onClose();
                      }}
                    />
                  )}
                </Tabs.Panel>
              );
            })}
          </Tabs.Root>
        )}
      </DialogContent>
    </Dialog>
  );
};
