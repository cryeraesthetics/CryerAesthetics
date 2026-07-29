import type { Session } from "next-auth";

export function hasActiveMembership(session: Session | null): boolean {
  return session?.user?.subscriptionStatus === "active";
}
