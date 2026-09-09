import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CreateAgentRequestDto,
  createAgentRequestSchema,
} from "@repo/shared/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

type CreateAgentCardProps = {
  onClose: () => void;
};

export const CreateAgentCard = ({ onClose }: CreateAgentCardProps) => {
  const form = useForm<CreateAgentRequestDto>({
    resolver: zodResolver(createAgentRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      systemPrompt: "",
      temperature: 0.7,
      maxTokens: 1000,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: CreateAgentRequestDto) => {
    const payload = {
      name: data.name,
      description: data.description,
      systemPrompt: data.systemPrompt,
      model: data.model,
      temperature: data.temperature,
      maxTokens: data.maxTokens,
    };

    console.log("Create agent:", payload);

    try {
      // API call
      toast.success("Agent created successfully");
      onClose();
    } catch (error) {
      console.error("Create agent error:", error);
      toast.error("Failed to create agent");
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-150 p-6 [&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Agent</DialogTitle>

          <DialogDescription>
            Configure your AI agent and define how it should behave.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">
                  {" "}
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Customer Support"
                  autoComplete="name"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Describe your agent's role and behavior"
                  autoComplete="description"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* System Prompt */}
          <Controller
            name="systemPrompt"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label htmlFor="systemPrompt">
                  System Prompt <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  {...field}
                  id="systemPrompt"
                  placeholder="You are a helpful customer support assistant..."
                  autoComplete="systemPrompt"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <p className="text-xs text-muted-foreground">
                  Define the behavior, role, and instructions for your agent.
                </p>
              </Field>
            )}
          />

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer px-4 py-2"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer px-4 py-2"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-between gap-2">
                  <Spinner />
                  <p>Creating...</p>
                </div>
              ) : (
                "Create Agent"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
