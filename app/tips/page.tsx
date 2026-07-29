import { auth } from "@/lib/auth";
import { hasActiveMembership } from "@/lib/access";
import { beginnerTips, advancedTips, motivationalQuotes } from "@/data/tips";
import PaywallGate from "@/components/PaywallGate";

export const metadata = {
  title: "Tips & Motivation | Cryer Aesthetics",
};

function TipList({ tips }: { tips: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tips.map((tip) => (
        <div
          key={tip.title}
          className="rounded-xl border border-sand-200 bg-cream-50 p-5"
        >
          <h3 className="font-semibold text-cocoa-800">{tip.title}</h3>
          <p className="mt-1 text-sm text-cocoa-600">{tip.body}</p>
        </div>
      ))}
    </div>
  );
}

export default async function TipsPage() {
  const session = await auth();
  const isMember = hasActiveMembership(session);

  const freeBeginnerTips = beginnerTips.slice(0, 2);
  const freeAdvancedTips = advancedTips.slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-cocoa-800">
          Tips &amp; Motivation
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
          Guidance for wherever you are in your skin care journey — just
          starting out or refining an established routine.
        </p>
      </div>

      <section className="mt-12 rounded-2xl bg-sage-50 p-8 text-center">
        <p className="font-serif text-xl italic text-cocoa-800">
          &ldquo;{motivationalQuotes[0]}&rdquo;
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-cocoa-600">
          {motivationalQuotes.slice(1).map((q) => (
            <span key={q} className="rounded-full bg-cream-50 px-3 py-1">
              {q}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          New to Skin Care? Start Here
        </h2>
        <TipList tips={freeBeginnerTips} />
        {beginnerTips.length > 2 && (
          <div className="mt-4">
            <PaywallGate unlocked={isMember}>
              <TipList tips={beginnerTips.slice(2)} />
            </PaywallGate>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          Already on Your Journey? Level Up
        </h2>
        <TipList tips={freeAdvancedTips} />
        {advancedTips.length > 2 && (
          <div className="mt-4">
            <PaywallGate unlocked={isMember}>
              <TipList tips={advancedTips.slice(2)} />
            </PaywallGate>
          </div>
        )}
      </section>
    </div>
  );
}
