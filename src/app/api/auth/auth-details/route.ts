import { prisma } from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(NextRequest: NextRequest) {
  const { id, token } = await NextRequest.json();
  console.log(id, token);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { tokens: true },
    });
    const existingToken = user?.tokens.find((t) => t.token === token);
    if (user != null && existingToken)
      return NextResponse.json({ user }, { status: 200 });
  } catch (e: any) {
    console.log(e.message);
  }
  return NextResponse.json({ message: "USER NOT FOUND" }, { status: 400 });
}
