import { RetrievLogo } from "@/components/common/RetrievLogo";

type AppLoaderProps = {
  label?: string;
};

export const AppLoader = ({ label = "Loading..." }: AppLoaderProps) => {
  return (
    <div
      className="grid min-h-dvh place-items-center bg-surface px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center text-center">
        <div className="app-loader-mark flex size-14 items-center justify-center rounded-xl border bg-background shadow-sm">
          <RetrievLogo className="size-8" />
        </div>

        <p className="mt-5 text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          This will only take a moment
        </p>

        <div
          className="mt-5 h-0.5 w-28 overflow-hidden rounded-full bg-border"
          aria-hidden="true"
        >
          <span className="app-loader-progress block h-full w-1/3 rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  );
};
