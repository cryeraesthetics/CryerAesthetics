import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  skinType: z.enum(["normal", "oily", "dry", "combination", "sensitive"]),
  answers: z.record(z.string(), z.number()),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ saved: false });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid quiz submission." }, { status: 400 });
  }

  await prisma.quizResult.create({
    data: {
      userId: session.user.id,
      skinType: parsed.data.skinType,
      answers: JSON.stringify(parsed.data.answers),
    },
  });

  return NextResponse.json({ saved: true });
}
