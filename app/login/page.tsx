"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-2 font-serif text-3xl text-cocoa-800">Welcome back</h1>
      <p className="mb-8 text-cocoa-600">Log in to continue your skin care journey.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
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
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-cocoa-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-sage-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
