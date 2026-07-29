import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book Now | Cryer Aesthetics",
};

const externalBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function BookNowPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-cocoa-800">Book Now</h1>
      <p className="mt-3 text-cocoa-600">
        Ready for an in-person consultation or treatment? Request an
        appointment below and we&apos;ll confirm a time with you.
      </p>

      {externalBookingUrl && (
        <a
          href={externalBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-sage-600 px-6 py-3 font-semibold text-cream-50 transition hover:bg-sage-700"
        >
          Book Instantly Online →
        </a>
      )}

      <div className="mt-10">
        <BookingForm />
      </div>
    </div>
  );
}
