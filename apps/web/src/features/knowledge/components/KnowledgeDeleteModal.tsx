import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { KnowledgeResponseDto } from "@repo/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteKnowledge } from "../hooks/useKnowledgeBases";

type KnowledgeDeleteModalProps = {
  open: boolean;
  knowledge: KnowledgeResponseDto;
  onClose: () => void;
  onDeleted: () => void;
};

export const KnowledgeDeleteModal = ({
  open,
  knowledge,
  onClose,
  onDeleted,
}: KnowledgeDeleteModalProps) => {
  const mutation = useDeleteKnowledge();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleConfirm = async () => {
    if (mutation.isPending) return;
    setErrorMessage(undefined);
    try {
      await mutation.mutateAsync(knowledge.id);
      toast.success("Knowledge deleted successfully");
      onDeleted();
      onClose();
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.error?.message
        : undefined;
      const text =
        typeof message === "string"
          ? message
          : "Failed to delete knowledge. Please try again.";
      setErrorMessage(text);
      toast.error(text);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !mutation.isPending) onClose();
      }}
    >
      <DialogContent className="sm:max-w-90 p-6 [&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-lg">Delete knowledge?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium">{knowledge.title}</span>?
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage}
          </p>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            disabled={mutation.isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleConfirm}
          >
            {mutation.isPending ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
