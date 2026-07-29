"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({
  isLoggedIn,
  label = "Subscribe Now",
  className = "",
}: {
  isLoggedIn: boolean;
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!isLoggedIn) {
      router.push("/signup?next=subscribe");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Unable to start checkout.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Unable to start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={
          className ||
          "rounded-full bg-cocoa-600 px-6 py-3 font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
        }
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
