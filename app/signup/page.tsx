"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created, but sign-in failed. Please log in.");
        router.push("/login");
        return;
      }

      router.push("/subscribe");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-2 font-serif text-3xl text-cocoa-800">
        Create your account
      </h1>
      <p className="mb-8 text-cocoa-600">
        Join Cryer Aesthetics to start your personalized skin care journey.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-cocoa-700">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-cocoa-700">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-cocoa-700">
            Password
          </label>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
          <p className="mt-1 text-xs text-cocoa-500">Minimum 8 characters.</p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-cocoa-600 px-5 py-2.5 font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-cocoa-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-sage-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
