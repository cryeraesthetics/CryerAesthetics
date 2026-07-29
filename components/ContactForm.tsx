"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setStatus("error");
      return;
    }

    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 p-6 text-center">
        <p className="font-serif text-lg text-cocoa-800">
          Thank you for reaching out!
        </p>
        <p className="mt-1 text-sm text-cocoa-600">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
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
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
        disabled={status === "sending"}
        className="rounded-full bg-cocoa-600 px-5 py-2.5 font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
