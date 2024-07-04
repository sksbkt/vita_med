// app/api/hello/route.ts
import bcrypt from "bcrypt";
import { prisma } from "@/lib/utils/prima";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_JWT_SECRET_KEY || "";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userName, password } = await request.json();
    const user = await prisma.user.findUnique({
      where: { userName },
    });
    if (!user || (await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid username or password!" },
        { status: 401, statusText: "invalid username or password" }
      );
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (e) {
    console.log("ERROR", e);
    return NextResponse.json(
      { message: "an error occurred during login" },
      { status: 500 }
    );
  }
}
