"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  user: { name: string | null };
};

export default function ReviewsSection({
  skinType,
  canReview,
  isLoggedIn,
}: {
  skinType: string;
  canReview: boolean;
  isLoggedIn: boolean;
}) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?skinType=${skinType}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]));
  }, [skinType]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skinType, rating, title, body }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Unable to submit review.");
      setSubmitting(false);
      return;
    }

    setReviews((prev) => [data.review, ...(prev ?? [])]);
    setTitle("");
    setBody("");
    setRating(5);
    setSubmitting(false);
  }

  return (
    <div>
      {canReview && (
        <form
          onSubmit={submitReview}
          className="mb-8 rounded-2xl border border-sand-200 bg-cream-50 p-6"
        >
          <h3 className="font-serif text-lg text-cocoa-800">Leave a Review</h3>
          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm text-cocoa-600">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded-lg border border-sand-300 bg-cream-50 px-2 py-1 text-cocoa-800"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </div>
          <input
            required
            placeholder="Review title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3 w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
          <textarea
            required
            placeholder="Share your experience..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="mt-3 w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2 text-cocoa-800 outline-none focus:border-sage-500"
          />
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-full bg-cocoa-600 px-5 py-2 font-semibold text-cream-50 transition hover:bg-cocoa-700 disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      )}

      {!canReview && (
        <p className="mb-6 text-sm text-cocoa-500">
          {isLoggedIn
            ? "An active membership is required to post a review."
            : "Log in and subscribe to leave your own review."}
        </p>
      )}

      {reviews === null && <p className="text-cocoa-500">Loading reviews...</p>}
      {reviews?.length === 0 && (
        <p className="text-cocoa-500">
          No reviews yet — be the first to share your experience!
        </p>
      )}

      <div className="space-y-4">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-sand-200 bg-cream-50 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-cocoa-800">{review.title}</p>
              <span className="text-sm text-sage-600">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="mt-1 text-sm text-cocoa-600">{review.body}</p>
            <p className="mt-2 text-xs text-cocoa-400">
              {review.user.name ?? "Member"} ·{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
