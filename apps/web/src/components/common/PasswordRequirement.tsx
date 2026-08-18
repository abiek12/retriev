import { CheckCircle2, Circle } from "lucide-react";

type PasswordRequirementProps = {
  valid: boolean;
  children: React.ReactNode;
};

export const PasswordRequirements = ({
  valid,
  children,
}: PasswordRequirementProps) => {
  return (
    <div className="flex item-center gap-2 text-sm">
      {valid ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Circle className="h-4 w-4" />
      )}

      <span>{children}</span>
    </div>
  );
};
