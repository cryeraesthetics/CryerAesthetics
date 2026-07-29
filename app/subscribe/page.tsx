import { auth } from "@/lib/auth";
import CheckoutButton from "@/components/CheckoutButton";
import { hasActiveMembership } from "@/lib/access";

const perks = [
  "Full personalized skin type regimens (AM/PM + weekly)",
  "Do's and don'ts tailored to your skin",
  "Guided skin analysis with unlimited retakes",
  "Curated GreenEnvee product recommendations",
  "Full access to community reviews",
  "Motivational tips & guides for every stage of your journey",
  "Priority booking for in-person consultations",
];

export default async function SubscribePage() {
  const session = await auth();
  const isMember = hasActiveMembership(session);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
          Membership
        </span>
        <h1 className="mt-4 font-serif text-4xl text-cocoa-800">
          Full Access to Cryer Aesthetics
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
          One simple monthly membership unlocks every skin type regimen,
          your personal skin analysis, curated product picks, and our full
          library of guides.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-3xl border border-sand-200 bg-cream-50 p-8 shadow-sm">
        <div className="text-center">
          <p className="font-serif text-5xl text-cocoa-800">
            $19
            <span className="text-lg font-sans font-normal text-cocoa-600">
              {" "}
              / month
            </span>
          </p>
          <p className="mt-1 text-sm text-cocoa-500">Cancel anytime.</p>
        </div>

        <ul className="mt-8 space-y-3">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-sm text-cocoa-700">
              <span className="mt-0.5 text-sage-600">✓</span>
              {perk}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {isMember ? (
            <p className="rounded-full bg-sage-100 px-5 py-3 text-center font-semibold text-sage-700">
              You&apos;re already a member — welcome back!
            </p>
          ) : (
            <CheckoutButton
              isLoggedIn={Boolean(session)}
              className="w-full rounded-full bg-cocoa-600 px-6 py-3 text-center font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
            />
          )}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-xs text-cocoa-500">
        Payments are securely processed by Stripe. Cryer Aesthetics never
        stores your card details.
      </p>
    </div>
  );
}
