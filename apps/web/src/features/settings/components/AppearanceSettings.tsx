import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useId } from "react";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const groupId = useId();

  return (
    <section
      aria-labelledby={`${groupId}-title`}
      className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs sm:p-6"
    >
      <h2 id={`${groupId}-title`} className="text-base font-semibold">
        Appearance
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Theme preference for your workspace interface.
      </p>

      <fieldset className="mt-5 grid grid-cols-3 gap-3">
        <legend className="sr-only">Theme</legend>
        {themes.map(({ value, label, icon: Icon }) => (
          <label key={value} className="relative min-w-0 cursor-pointer">
            <input
              type="radio"
              name={groupId}
              value={value}
              checked={(theme ?? "light") === value}
              onChange={() => setTheme(value)}
              className="peer sr-only"
            />
            <span className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border bg-surface-container-low px-2 py-4 text-sm font-medium transition-colors hover:bg-surface-container peer-checked:border-foreground peer-checked:bg-background peer-checked:ring-1 peer-checked:ring-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ring">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
              {label}
            </span>
          </label>
        ))}
      </fieldset>
    </section>
  );
};
