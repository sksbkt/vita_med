import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "@/lib/utils/prisma";
export async function POST(request: NextRequest, response: NextResponse) {
  const { userName, firstName, lastName, password } = await request.json();
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        userName,
        firstName,
        lastName,
        password: hashPassword,
        role: ["USER"],
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 400 }
    );
  }
}
