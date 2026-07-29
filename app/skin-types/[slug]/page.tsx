import Image from "next/image";
import { notFound } from "next/navigation";
import { skinTypes, getSkinType } from "@/data/skinTypes";
import { auth } from "@/lib/auth";
import { hasActiveMembership } from "@/lib/access";
import PaywallGate from "@/components/PaywallGate";
import ProductRecs from "@/components/ProductRecs";
import ReviewsSection from "@/components/ReviewsSection";

export function generateStaticParams() {
  return skinTypes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getSkinType(slug);
  return { title: data ? `${data.name} | Cryer Aesthetics` : "Skin Types" };
}

export default async function SkinTypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getSkinType(slug);
  if (!data) notFound();

  const session = await auth();
  const isMember = hasActiveMembership(session);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:items-center">
        <div className="mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-sand-200 sm:h-full sm:w-full sm:rounded-2xl">
          <Image
            src={data.image}
            alt={data.name}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-serif text-4xl text-cocoa-800">{data.name}</h1>
          <p className="mt-2 text-lg text-cocoa-600">{data.tagline}</p>
          <p className="mt-4 text-cocoa-700">{data.description}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          Signs You Have This Skin Type
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {data.traits.map((trait) => (
            <li
              key={trait}
              className="flex items-start gap-2 rounded-lg bg-cream-50 px-4 py-3 text-sm text-cocoa-700"
            >
              <span className="text-sage-600">•</span>
              {trait}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          Your Skin Care Regimen
        </h2>
        <PaywallGate unlocked={isMember}>
          <div className="grid gap-6 sm:grid-cols-3">
            {(["am", "pm", "weekly"] as const).map((period) => (
              <div key={period}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-700">
                  {period === "am" ? "Morning" : period === "pm" ? "Evening" : "Weekly"}
                </h3>
                <ol className="space-y-2">
                  {data.regimen[period].map((step, i) => (
                    <li
                      key={step}
                      className="rounded-lg border border-sand-200 bg-cream-50 px-3 py-2 text-sm text-cocoa-700"
                    >
                      {i + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </PaywallGate>
      </section>

      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-4 font-serif text-2xl text-cocoa-800">Do&apos;s</h2>
          <PaywallGate unlocked={isMember}>
            <ul className="space-y-2">
              {data.dos.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-sage-50 px-4 py-3 text-sm text-cocoa-700"
                >
                  ✓ {item}
                </li>
              ))}
            </ul>
          </PaywallGate>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-2xl text-cocoa-800">Don&apos;ts</h2>
          <PaywallGate unlocked={isMember}>
            <ul className="space-y-2">
              {data.donts.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-cocoa-50 px-4 py-3 text-sm text-cocoa-700"
                >
                  ✕ {item}
                </li>
              ))}
            </ul>
          </PaywallGate>
        </div>
      </section>

      <section id="products" className="mt-12 scroll-mt-24">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          Recommended Products from GreenEnvee
        </h2>
        <PaywallGate unlocked={isMember}>
          <ProductRecs products={data.products} />
        </PaywallGate>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-sand-200 bg-cream-50 p-4"
            >
              <summary className="cursor-pointer font-semibold text-cocoa-800">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-cocoa-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cocoa-800">Reviews</h2>
        <ReviewsSection
          skinType={data.slug}
          canReview={isMember}
          isLoggedIn={Boolean(session)}
        />
      </section>
    </div>
  );
}
