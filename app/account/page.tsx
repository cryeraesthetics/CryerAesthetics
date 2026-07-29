import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasActiveMembership } from "@/lib/access";
import CheckoutButton from "@/components/CheckoutButton";
import PortalButton from "@/components/PortalButton";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isMember = hasActiveMembership(session);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl text-cocoa-800">My Account</h1>
      <p className="mt-2 text-cocoa-600">{user?.name ?? user?.email}</p>

      <div className="mt-8 rounded-2xl border border-sand-200 bg-cream-50 p-6">
        <h2 className="font-serif text-xl text-cocoa-800">Membership Status</h2>
        {isMember ? (
          <>
            <p className="mt-2 text-sage-700 font-semibold">Active member</p>
            {user?.currentPeriodEnd && (
              <p className="mt-1 text-sm text-cocoa-600">
                Renews on{" "}
                {new Date(user.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
            <div className="mt-4">
              <PortalButton />
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-cocoa-600">
              You don&apos;t have an active membership yet. Subscribe to
              unlock full regimens, your skin analysis results, and curated
              product picks.
            </p>
            <div className="mt-4">
              <CheckoutButton isLoggedIn label="Subscribe Now" />
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/skin-types" className="text-sage-600 hover:underline">
          Browse Skin Types
        </Link>
        <Link href="/quiz" className="text-sage-600 hover:underline">
          Retake Skin Analysis
        </Link>
        <Link href="/contact" className="text-sage-600 hover:underline">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
