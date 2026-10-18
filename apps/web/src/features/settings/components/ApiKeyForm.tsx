import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createApiKeyRequestSchema,
  rotateApiKeyRequestSchema,
} from "@repo/shared";
import type {
  CreateApiKeyRequestDto,
  ErrorResponse,
  RotateApiKeyRequestDto,
} from "@repo/shared";
import { Spinner } from "@/components/ui/spinner";
import { isAxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import {
  apiKeyProviders,
  providerLabel,
  type ApiKeyConfiguration,
  type ApiKeyProvider,
  type ApiKeyType,
} from "../types";

type ApiKeyFormProps = {
  type: ApiKeyType;
  configuration?: ApiKeyConfiguration | null;
  isPending: boolean;
  onSave: (input: CreateApiKeyRequestDto) => Promise<void>;
  onRotate: (input: RotateApiKeyRequestDto) => Promise<void>;
  onCancel: () => void;
};

type FormErrors = Partial<Record<"provider" | "model" | "apiKey", string>>;

export const ApiKeyForm = ({
  type,
  configuration,
  isPending,
  onSave,
  onRotate,
  onCancel,
}: ApiKeyFormProps) => {
  const id = useId();
  const [provider, setProvider] = useState<ApiKeyProvider>(
    configuration?.provider ?? "openai",
  );
  const [model, setModel] = useState(configuration?.model ?? "");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const submitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending || submitting.current) return;
    setServerError(null);
    const result = configuration
      ? rotateApiKeyRequestSchema.safeParse({ apiKey })
      : createApiKeyRequestSchema.safeParse({
          type,
          provider,
          model,
          apiKey,
        });

    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "provider" || field === "model" || field === "apiKey") {
          nextErrors[field] ??= issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    submitting.current = true;
    setErrors({});
    try {
      if (configuration) {
        await onRotate(result.data);
      } else {
        await onSave({
          type,
          provider,
          model: model.trim(),
          apiKey: result.data.apiKey,
        });
      }
      setApiKey("");
      setShowKey(false);
    } catch (error) {
      setServerError(
        (isAxiosError<ErrorResponse>(error)
          ? error.response?.data?.error?.message
          : undefined) ?? "Could not save the API key. Please try again.",
      );
    } finally {
      submitting.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-busy={isPending}
    >
      {configuration ? (
        <div className="rounded-lg border bg-surface-container-low p-4">
          <p className="text-sm font-medium">
            {providerLabel(configuration.provider)}
          </p>
          <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
            {configuration.model}
          </p>
        </div>
      ) : (
        <>
          <Field data-invalid={Boolean(errors.provider)}>
            <FieldLabel htmlFor={`${id}-provider`}>Provider</FieldLabel>
            <Select
              disabled={isPending}
              value={provider}
              onValueChange={(value) => {
                if (value) setProvider(value as ApiKeyProvider);
              }}
            >
              <SelectTrigger
                id={`${id}-provider`}
                className="h-10 w-full bg-background"
                aria-invalid={Boolean(errors.provider)}
                aria-describedby={
                  errors.provider ? `${id}-provider-error` : undefined
                }
              >
                <SelectValue>{providerLabel(provider)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {apiKeyProviders.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.provider && (
              <p
                id={`${id}-provider-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.provider}
              </p>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.model)}>
            <FieldLabel htmlFor={`${id}-model`}>Model</FieldLabel>
            <Input
              id={`${id}-model`}
              disabled={isPending}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder={
                provider === "openrouter"
                  ? "provider/model-name"
                  : "Enter model ID"
              }
              maxLength={150}
              autoComplete="off"
              spellCheck={false}
              className="h-10 bg-background"
              aria-invalid={Boolean(errors.model)}
              aria-describedby={
                errors.model ? `${id}-model-error` : `${id}-model-help`
              }
            />
            {errors.model ? (
              <p
                id={`${id}-model-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.model}
              </p>
            ) : (
              <p
                id={`${id}-model-help`}
                className="text-xs text-muted-foreground"
              >
                Use the model ID provided by your provider.
              </p>
            )}
          </Field>
        </>
      )}

      <Field data-invalid={Boolean(errors.apiKey)}>
        <FieldLabel htmlFor={`${id}-key`}>
          {configuration ? "Replacement API key" : "API key"}
        </FieldLabel>
        <div className="relative">
          <Input
            id={`${id}-key`}
            disabled={isPending}
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder={
              configuration
                ? "Enter your replacement API key"
                : "Enter your API key"
            }
            maxLength={4096}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="h-10 bg-background pr-11 font-mono text-sm"
            aria-invalid={Boolean(errors.apiKey)}
            aria-describedby={
              errors.apiKey ? `${id}-key-error` : `${id}-key-help`
            }
          />
          <Button
            type="button"
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
            aria-label={showKey ? "Hide API key" : "Show API key"}
            aria-pressed={showKey}
            onClick={() => setShowKey((visible) => !visible)}
          >
            {showKey ? (
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </Button>
        </div>
        {errors.apiKey ? (
          <p
            id={`${id}-key-error`}
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.apiKey}
          </p>
        ) : (
          <p
            id={`${id}-key-help`}
            className="text-xs leading-relaxed text-muted-foreground"
          >
            {configuration
              ? "Your existing key stays active until a replacement is validated and saved."
              : "Validation checks authentication only. Model access and credits aren't verified."}
          </p>
        )}
      </Field>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner />
              Validating key...
            </>
          ) : configuration ? (
            "Rotate key"
          ) : (
            "Save key"
          )}
        </Button>
      </div>
    </form>
  );
};
