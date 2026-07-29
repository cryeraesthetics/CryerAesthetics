import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Email Us | Cryer Aesthetics",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-cocoa-800">Email Us</h1>
      <p className="mt-3 text-cocoa-600">
        Questions about your skin, membership, or a booking? Send us a
        message and we&apos;ll follow up soon.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
