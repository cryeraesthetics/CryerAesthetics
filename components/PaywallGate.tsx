import Link from "next/link";
import type { ReactNode } from "react";

export default function PaywallGate({
  unlocked,
  teaser,
  children,
}: {
  unlocked: boolean;
  teaser?: ReactNode;
  children: ReactNode;
}) {
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sand-200 bg-cream-50">
      <div className="pointer-events-none select-none blur-sm opacity-60">
        {teaser ?? children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-cream-50/40 to-cream-50/95 px-6 text-center">
        <span className="rounded-full bg-cocoa-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream-50">
          Members Only
        </span>
        <p className="max-w-sm font-serif text-lg text-cocoa-800">
          Subscribe to unlock full regimens, product picks, and expert
          guidance.
        </p>
        <Link
          href="/subscribe"
          className="rounded-full bg-sage-600 px-5 py-2 text-sm font-semibold text-cream-50 transition hover:bg-sage-700"
        >
          Join Cryer Aesthetics
        </Link>
      </div>
    </div>
  );
}
