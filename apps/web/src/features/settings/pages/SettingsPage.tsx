import { ApiKeySettings } from "../components/ApiKeySettings";
import { AppearanceSettings } from "../components/AppearanceSettings";
import { ProfileSettings } from "../components/ProfileSettings";

export const SettingsPage = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl space-y-6 pb-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your profile, API keys, and appearance.
          </p>
        </header>
        <ProfileSettings />
        <ApiKeySettings />
        <AppearanceSettings />
      </div>
    </div>
  );
};
