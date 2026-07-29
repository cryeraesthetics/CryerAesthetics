import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Cryer Aesthetics | Your Skincare Companion",
  description:
    "Cryer Aesthetics gives you personalized skin type regimens, a guided skin analysis, expert tips, and curated product recommendations — all in one welcoming space.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream-100 text-cocoa-800">
        <Navbar session={session} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
