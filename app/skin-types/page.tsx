import Link from "next/link";
import Image from "next/image";
import { skinTypes } from "@/data/skinTypes";

export const metadata = {
  title: "Skin Types | Cryer Aesthetics",
};

export default function SkinTypesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-cocoa-800">
          Explore Every Skin Type
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
          Not sure which one is yours?{" "}
          <Link href="/quiz" className="font-semibold text-sage-600 hover:underline">
            Take our Skin Analysis
          </Link>{" "}
          to find out in under two minutes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                width={400}
                height={400}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="font-serif text-xl text-cocoa-800">{type.name}</h2>
              <p className="mt-1 text-sm text-cocoa-600">{type.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
