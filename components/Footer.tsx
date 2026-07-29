import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-cocoa-800 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 font-serif text-cream-50">
              C
            </span>
            <span className="font-serif text-lg">Cryer Aesthetics</span>
          </div>
          <p className="text-sm text-cream-200/80">
            Your welcoming companion for a healthier, more confident skin
            care journey.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sage-300">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-cream-200/80">
            <li><Link href="/skin-types" className="hover:text-cream-50">Skin Types</Link></li>
            <li><Link href="/quiz" className="hover:text-cream-50">Skin Analysis</Link></li>
            <li><Link href="/tips" className="hover:text-cream-50">Tips &amp; Motivation</Link></li>
            <li><Link href="/greenenvee" className="hover:text-cream-50">Shop GreenEnvee</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sage-300">
            Cryer Aesthetics
          </h3>
          <ul className="space-y-2 text-sm text-cream-200/80">
            <li><Link href="/about" className="hover:text-cream-50">About Us</Link></li>
            <li><Link href="/book-now" className="hover:text-cream-50">Book Now</Link></li>
            <li><Link href="/subscribe" className="hover:text-cream-50">Membership</Link></li>
            <li><Link href="/my-book" className="hover:text-cream-50">The Book</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sage-300">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-cream-200/80">
            <li><Link href="/contact" className="hover:text-cream-50">Email Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cocoa-700 px-4 py-4 text-center text-xs text-cream-200/60 sm:px-6">
        © {new Date().getFullYear()} Cryer Aesthetics. All rights reserved.
      </div>
    </footer>
  );
}
