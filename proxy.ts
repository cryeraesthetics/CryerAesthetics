import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const memberOnlyPrefixes = ["/account"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = memberOnlyPrefixes.some((p) => pathname.startsWith(p));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*"],
};
