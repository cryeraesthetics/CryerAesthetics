export const metadata = {
  title: "The Book | Cryer Aesthetics",
};

const bookLink = process.env.NEXT_PUBLIC_BOOK_LINK;

export default function MyBookPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-serif text-4xl text-cocoa-800">The Book</h1>
      <p className="mt-4 text-cocoa-600">
        Dive deeper into your skin care journey with my book — packed with
        insights, routines, and stories to help you build lasting, healthy
        habits.
      </p>

      <div className="mt-8">
        {bookLink ? (
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-cocoa-600 px-6 py-3 font-semibold text-cream-50 transition hover:bg-cocoa-700"
          >
            Get the Book →
          </a>
        ) : (
          <p className="rounded-2xl border border-sand-200 bg-cream-50 p-6 text-sm text-cocoa-500">
            The book link hasn&apos;t been added yet. Set{" "}
            <code className="rounded bg-cream-200 px-1.5 py-0.5">
              NEXT_PUBLIC_BOOK_LINK
            </code>{" "}
            in your environment variables to enable this button.
          </p>
        )}
      </div>
    </div>
  );
}
