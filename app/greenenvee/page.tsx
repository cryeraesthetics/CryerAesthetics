import Link from "next/link";
import { skinTypes } from "@/data/skinTypes";

export const metadata = {
  title: "Shop GreenEnvee | Cryer Aesthetics",
};

export default function GreenEnveePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
          Our Product Partner
        </span>
        <h1 className="mt-4 font-serif text-4xl text-cocoa-800">
          Shop GreenEnvee
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
          We&apos;ve partnered with GreenEnvee to bring you clean, effective
          skin care products. Every skin type page includes curated product
          picks matched to your specific needs — head to your skin type to
          see recommendations, or shop the full GreenEnvee catalog directly.
        </p>
        <a
          href="https://greenenvee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-sage-600 px-6 py-3 font-semibold text-cream-50 transition hover:bg-sage-700"
        >
          Visit GreenEnvee.com →
        </a>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-center font-serif text-2xl text-cocoa-800">
          Find Products for Your Skin Type
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skinTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/skin-types/${type.slug}#products`}
              className="rounded-xl border border-sand-200 bg-cream-50 p-5 text-center transition hover:shadow-sm"
            >
              <p className="font-semibold text-cocoa-800">{type.name}</p>
              <p className="mt-1 text-sm text-sage-600">
                View recommended products →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
