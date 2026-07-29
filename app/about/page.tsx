export const metadata = {
  title: "About | Cryer Aesthetics",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-cocoa-800">
        About Cryer Aesthetics
      </h1>

      <div className="mt-8 space-y-5 text-cocoa-700">
        <p>
          Cryer Aesthetics was founded to make expert, personalized skin
          care guidance accessible to everyone — whether you&apos;re just
          starting your journey or refining a routine you&apos;ve had for
          years.
        </p>
        <p>
          We believe healthy skin starts with understanding: knowing your
          skin type, what it truly needs, and how to build sustainable
          habits around it. That&apos;s why every regimen, tip, and product
          recommendation on this app is organized around your specific
          skin type — not one-size-fits-all advice.
        </p>
        <p>
          Beyond the app, Cryer Aesthetics offers in-person consultations
          and treatments. Members get priority access to book sessions and
          ongoing support as their skin — and their needs — evolve.
        </p>
        <p className="text-sm text-cocoa-500 italic">
          Update this page with your personal story, credentials, and
          photos to make it your own.
        </p>
      </div>
    </div>
  );
}
