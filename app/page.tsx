import Link from "next/link";
import Image from "next/image";
import { skinTypes } from "@/data/skinTypes";
import { auth } from "@/lib/auth";
import { hasActiveMembership } from "@/lib/access";
import CheckoutButton from "@/components/CheckoutButton";

export default async function Home() {
  const session = await auth();
  const isMember = hasActiveMembership(session);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-cream-200 to-cream-100 px-4 py-20 text-center sm:px-6">
        <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
          Cryer Aesthetics
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl font-serif text-4xl text-cocoa-800 sm:text-5xl">
          Your Complete Skin Care Companion
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cocoa-600">
          Discover your skin type, get a personalized regimen, and shop
          curated products — all in one welcoming space designed for your
          journey to healthy, confident skin.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/quiz"
            className="rounded-full bg-cocoa-600 px-6 py-3 font-semibold text-cream-50 transition hover:bg-cocoa-700"
          >
            Take the Skin Analysis
          </Link>
          {!isMember && (
            <Link
              href="/subscribe"
              className="rounded-full border border-cocoa-400 px-6 py-3 font-semibold text-cocoa-700 transition hover:bg-cocoa-50"
            >
              View Membership
            </Link>
          )}
        </div>
      </section>

      {/* Skin types preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-cocoa-800">
            Every Skin Type, Fully Explained
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-cocoa-600">
            Regimens, do&apos;s and don&apos;ts, FAQs, and product picks
            tailored to your skin.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {skinTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/skin-types/${type.slug}`}
              className="group overflow-hidden rounded-2xl border border-sand-200 bg-cream-50 transition hover:shadow-md"
            >
              <div className="aspect-square w-full overflow-hidden bg-cream-200">
                <Image
                  src={type.image}
                  alt={type.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-serif text-lg text-cocoa-800">{type.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-sage-50 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Guided Skin Analysis",
              body: "Answer a few quick questions and discover your skin type instantly, with tailored recommendations to match.",
              href: "/quiz",
            },
            {
              title: "Tips & Motivation",
              body: "Guides and encouragement for beginners and seasoned skin care enthusiasts alike.",
              href: "/tips",
            },
            {
              title: "GreenEnvee Products",
              body: "Curated product recommendations from our partner GreenEnvee, matched to your skin type.",
              href: "/greenenvee",
            },
            {
              title: "Real Member Reviews",
              body: "See what other members with your skin type have to say — and share your own experience.",
              href: "/skin-types",
            },
            {
              title: "Book a Consultation",
              body: "Ready for in-person care? Book your next appointment with Cryer Aesthetics directly.",
              href: "/book-now",
            },
            {
              title: "The Book",
              body: "Take your journey further with insights and routines from my book.",
              href: "/my-book",
            },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="rounded-2xl bg-cream-50 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-xl text-cocoa-800">{f.title}</h3>
              <p className="mt-2 text-sm text-cocoa-600">{f.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Membership CTA */}
      {!isMember && (
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-serif text-3xl text-cocoa-800">
            Unlock Full Access to Your Skin Care Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
            Membership gives you complete regimens, do&apos;s and
            don&apos;ts, product picks, and the ability to share reviews —
            all for one simple monthly price.
          </p>
          <div className="mt-6 flex justify-center">
            <CheckoutButton isLoggedIn={Boolean(session)} label="Join Cryer Aesthetics" />
          </div>
        </section>
      )}
    </div>
  );
}
