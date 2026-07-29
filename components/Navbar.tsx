"use client";

import Link from "next/link";
import { useState } from "react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

const links = [
  { href: "/skin-types", label: "Skin Types" },
  { href: "/quiz", label: "Skin Analysis" },
  { href: "/tips", label: "Tips & Motivation" },
  { href: "/greenenvee", label: "Shop GreenEnvee" },
  { href: "/book-now", label: "Book Now" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const isMember = session?.user?.subscriptionStatus === "active";

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cocoa-600 text-cream-50 font-serif text-lg">
            C
          </span>
          <span className="font-serif text-xl text-cocoa-800">
            Cryer Aesthetics
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cocoa-700 transition hover:text-sage-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {session ? (
            <>
              <Link
                href="/account"
                className="text-sm font-medium text-cocoa-700 hover:text-sage-600"
              >
                {isMember ? "My Account" : "Complete Membership"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-cocoa-300 px-4 py-1.5 text-sm font-medium text-cocoa-700 transition hover:bg-cocoa-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-cocoa-700 hover:text-sage-600"
              >
                Log in
              </Link>
              <Link
                href="/subscribe"
                className="rounded-full bg-cocoa-600 px-4 py-1.5 text-sm font-semibold text-cream-50 transition hover:bg-cocoa-700"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-cocoa-700"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-sand-200 bg-cream-50 px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cocoa-700 hover:bg-cream-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-sand-200 pt-2">
            {session ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-cocoa-700 hover:bg-cream-200"
                >
                  {isMember ? "My Account" : "Complete Membership"}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-cocoa-700 hover:bg-cream-200"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-cocoa-700 hover:bg-cream-200"
                >
                  Log in
                </Link>
                <Link
                  href="/subscribe"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-cocoa-600 px-3 py-2 text-center text-sm font-semibold text-cream-50 hover:bg-cocoa-700"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
