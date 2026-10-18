import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export const ProfileSettings = () => {
  const { user } = useCurrentUser();
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <section
      aria-labelledby="profile-title"
      className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs sm:p-6"
    >
      <h2 id="profile-title" className="text-base font-semibold">
        Profile
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Your account details.
      </p>

      <div className="mt-5 flex items-start gap-4 sm:items-center sm:gap-5">
        <Avatar className="size-14">
          {user?.image && (
            <AvatarImage src={user.image} alt="Your profile photo" />
          )}
          <AvatarFallback className="text-base font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <dl className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="min-w-0">
            <dt className="text-xs text-muted-foreground">Name</dt>
            <dd className="mt-1 break-words text-sm font-medium">
              {user?.name || "Not provided"}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs text-muted-foreground">Email address</dt>
            <dd className="mt-1 break-all text-sm font-medium">
              {user?.email || "Not provided"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
