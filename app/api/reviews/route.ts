import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasActiveMembership } from "@/lib/access";
import { skinTypes } from "@/data/skinTypes";

const validSlugs = skinTypes.map((s) => s.slug);

const reviewSchema = z.object({
  skinType: z.enum(validSlugs as [string, ...string[]]),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(2000),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skinType = searchParams.get("skinType");
  if (!skinType || !validSlugs.includes(skinType)) {
    return NextResponse.json({ error: "Invalid skin type." }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { skinType },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
    take: 50,
  });

  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }
  if (!hasActiveMembership(session)) {
    return NextResponse.json(
      { error: "An active membership is required to post a review." },
      { status: 403 }
    );
  }

  const parsed = reviewSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid review submission." }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      skinType: parsed.data.skinType,
      rating: parsed.data.rating,
      title: parsed.data.title,
      body: parsed.data.body,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
