import { useState } from "react";
import { FileText, Link, Text } from "lucide-react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  createKnowledgeRequestSchema,
  updateKnowledgeRequestSchema,
  knowledgeFileMimeTypeSchema,
  type CreateKnowledgeRequestDto,
  type UpdateKnowledgeRequestDto,
  type KnowledgeResponseDto,
} from "@repo/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  completeKnowledgeUpload,
  createKnowledge,
  getKnowledge,
  updateKnowledge,
} from "../api";
import type { KnowledgeFormModalProps } from "../types";

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  ) : null;

function MetadataFields({
  title,
  description,
  titleError,
  descriptionError,
}: {
  title: UseFormRegisterReturn;
  description: UseFormRegisterReturn;
  titleError?: string;
  descriptionError?: string;
}) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="knowledge-title">Title *</FieldLabel>
        <Input
          {...title}
          id="knowledge-title"
          placeholder="Customer support FAQ"
          aria-invalid={!!titleError}
        />
        <ErrorMessage message={titleError} />
      </Field>
      <Field>
        <FieldLabel htmlFor="knowledge-description">Description</FieldLabel>
        <Textarea
          {...description}
          id="knowledge-description"
          placeholder="Describe this knowledge source"
          aria-invalid={!!descriptionError}
        />
        <ErrorMessage message={descriptionError} />
      </Field>
    </>
  );
}

function FormActions({
  pending,
  edit,
  onClose,
}: {
  pending: boolean;
  edit?: boolean;
  onClose: () => void;
}) {
  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={pending}>
        {pending && <Spinner />}
        {pending
          ? edit
            ? "Updating…"
            : "Creating…"
          : edit
            ? "Update Knowledge"
            : "Create Knowledge"}
      </Button>
    </DialogFooter>
  );
}

function reportError(error: unknown) {
  const message = isAxiosError(error)
    ? error.response?.data?.error?.message
    : undefined;
  return typeof message === "string"
    ? message
    : "Unable to save knowledge. Please try again.";
}

type FormProps = {
  onClose: () => void;
  onSaved: (knowledge: KnowledgeResponseDto) => void;
  onBusyChange: (busy: boolean) => void;
};

function CreateKnowledgeForm({ onClose, onSaved, onBusyChange }: FormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string>();
  const form = useForm<CreateKnowledgeRequestDto>({
    resolver: zodResolver(createKnowledgeRequestSchema),
    defaultValues: { title: "", description: "", type: "text", content: "" },
  });
  const type = form.watch("type");
  const pending = form.formState.isSubmitting;

  const changeType = (type: CreateKnowledgeRequestDto["type"]) => {
    const shared = {
      title: form.getValues("title"),
      description: form.getValues("description") ?? "",
    };
    setFile(null);
    setSubmitError(undefined);
    switch (type) {
      case "text":
        form.reset({ ...shared, type, content: "" });
        break;
      case "file":
        form.reset({
          ...shared,
          type,
          fileName: "",
          mimeType: "application/pdf",
          sizeBytes: 0,
        });
        break;
      case "url":
        form.reset({ ...shared, type, url: "" });
        break;
    }
  };

  const submit = async (payload: CreateKnowledgeRequestDto) => {
    setSubmitError(undefined);
    if (payload.type === "file" && !file) {
      form.setError("fileName", { message: "Choose a PDF or TXT file." });
      return;
    }
    onBusyChange(true);
    try {
      const created = await createKnowledge(payload);
      let saved: KnowledgeResponseDto = created;
      if (payload.type === "file" && file) {
        if (!("upload" in created) || !created.upload)
          throw new Error("Missing upload instructions");
        const upload = await fetch(created.upload.url, {
          method: created.upload.method,
          headers: created.upload.headers,
          body: file,
          credentials: "omit",
        });
        if (!upload.ok) throw new Error("Upload failed");
        await completeKnowledgeUpload(created.id);
        saved = await getKnowledge(created.id);
      }
      onSaved(saved);
      toast.success("Knowledge created successfully");
      onClose();
    } catch (error) {
      setSubmitError(reportError(error));
    } finally {
      onBusyChange(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <fieldset disabled={pending} className="flex min-w-0 flex-col gap-5">
        <MetadataFields
          title={form.register("title")}
          description={form.register("description")}
          titleError={form.formState.errors.title?.message}
          descriptionError={form.formState.errors.description?.message}
        />
        <fieldset className="flex min-w-0 flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Source type</legend>
          <div className="grid grid-cols-3 gap-1 rounded-lg border bg-muted/40 p-1">
            {(
              [
                { value: "text", label: "Text", icon: Text },
                { value: "file", label: "File", icon: FileText },
                { value: "url", label: "URL", icon: Link },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <label key={value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="knowledge-source-type"
                  value={value}
                  checked={type === value}
                  onChange={() => changeType(value)}
                  className="peer sr-only"
                />
                <span className="flex h-9 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium text-muted-foreground transition-colors hover:bg-muted peer-checked:border-border peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {type === "text" && (
          <Field>
            <FieldLabel htmlFor="knowledge-content">Content *</FieldLabel>
            <Textarea
              {...form.register("content")}
              id="knowledge-content"
              rows={8}
              placeholder="Enter your knowledge content"
              aria-invalid={form.getFieldState("content").invalid}
            />
            <ErrorMessage
              message={form.getFieldState("content").error?.message}
            />
          </Field>
        )}
        {type === "url" && (
          <Field>
            <FieldLabel htmlFor="knowledge-url">Source URL *</FieldLabel>
            <Input
              {...form.register("url")}
              id="knowledge-url"
              type="url"
              placeholder="https://example.com/document.pdf"
              aria-invalid={form.getFieldState("url").invalid}
            />
            <ErrorMessage message={form.getFieldState("url").error?.message} />
          </Field>
        )}
        {type === "file" && (
          <Field>
            <FieldLabel htmlFor="knowledge-file">File *</FieldLabel>
            <Input
              id="knowledge-file"
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              aria-invalid={
                form.getFieldState("fileName").invalid ||
                form.getFieldState("sizeBytes").invalid ||
                form.getFieldState("mimeType").invalid
              }
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                setFile(selected);
                form.clearErrors(["fileName", "mimeType", "sizeBytes"]);
                form.setValue("fileName", selected?.name ?? "");
                form.setValue("sizeBytes", selected?.size ?? 0);
                const mime =
                  selected?.type ||
                  (selected?.name.toLowerCase().endsWith(".txt")
                    ? "text/plain"
                    : "application/pdf");
                const parsed = knowledgeFileMimeTypeSchema.safeParse(mime);
                form.setValue(
                  "mimeType",
                  parsed.success ? parsed.data : "application/pdf",
                );
                if (selected && !parsed.success) {
                  form.setValue("fileName", "");
                  form.setError("fileName", {
                    message: "Choose a PDF or TXT file.",
                  });
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              PDF or TXT, up to 10 MB.
            </p>
            <ErrorMessage
              message={form.getFieldState("fileName").error?.message}
            />
            <ErrorMessage
              message={form.getFieldState("sizeBytes").error?.message}
            />
            <ErrorMessage
              message={form.getFieldState("mimeType").error?.message}
            />
          </Field>
        )}
      </fieldset>
      <ErrorMessage message={submitError} />
      <FormActions pending={pending} onClose={onClose} />
    </form>
  );
}

function EditKnowledgeForm({
  knowledge,
  onClose,
  onSaved,
  onBusyChange,
}: FormProps & { knowledge: KnowledgeResponseDto }) {
  const [submitError, setSubmitError] = useState<string>();
  const form = useForm<UpdateKnowledgeRequestDto>({
    resolver: zodResolver(updateKnowledgeRequestSchema),
    defaultValues: {
      title: knowledge.title,
      description: knowledge.description ?? "",
    },
  });
  const pending = form.formState.isSubmitting;
  return (
    <form
      className="flex flex-col gap-5"
      noValidate
      onSubmit={form.handleSubmit(async (payload) => {
        setSubmitError(undefined);
        if (knowledge.description && !payload.description) {
          form.setError("description", {
            message: "Enter a description to replace the existing description.",
          });
          return;
        }
        onBusyChange(true);
        try {
          await updateKnowledge(knowledge.id, payload);
          const saved = await getKnowledge(knowledge.id);
          onSaved(saved);
          toast.success("Knowledge updated successfully");
          onClose();
        } catch (error) {
          setSubmitError(reportError(error));
        } finally {
          onBusyChange(false);
        }
      })}
    >
      <fieldset disabled={pending} className="flex min-w-0 flex-col gap-5">
        <MetadataFields
          title={form.register("title")}
          description={form.register("description", {
            setValueAs: (value: string) =>
              value.trim() === "" ? undefined : value,
          })}
          titleError={form.formState.errors.title?.message}
          descriptionError={form.formState.errors.description?.message}
        />
        <p className="text-sm text-muted-foreground">
          You can update the title and description. Create a new knowledge
          source to change its content or type.
        </p>
      </fieldset>
      <ErrorMessage message={submitError} />
      <FormActions pending={pending} edit onClose={onClose} />
    </form>
  );
}

export const KnowledgeFormModal = ({
  open,
  selectedKnowledge,
  onClose,
  onSaved,
}: KnowledgeFormModalProps) => {
  const [busy, setBusy] = useState(false);
  const props: FormProps = {
    onClose,
    onSaved: (knowledge) => onSaved?.(knowledge),
    onBusyChange: setBusy,
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !busy) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-150 [&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle>
            {selectedKnowledge ? "Edit" : "Create"} Knowledge
          </DialogTitle>
          <DialogDescription>
            {selectedKnowledge
              ? "Update your knowledge source details."
              : "Add text, upload a file, or import a URL for your AI agents."}
          </DialogDescription>
        </DialogHeader>
        {open &&
          (selectedKnowledge ? (
            <EditKnowledgeForm
              key={selectedKnowledge.id}
              {...props}
              knowledge={selectedKnowledge}
            />
          ) : (
            <CreateKnowledgeForm {...props} />
          ))}
      </DialogContent>
    </Dialog>
  );
};
