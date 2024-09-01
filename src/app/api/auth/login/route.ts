import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/utils/prisma";
import bcrypt from "bcrypt";
import { LoginResponseType } from "@/types/types";

export async function POST(request: NextRequest) {
  const SECRET_KEY = process.env.NEXT_JWT_SECRET_KEY || "";

  const { userName, password } = await request.json();
  console.log(userName, password);

  const user = await prisma.user.findUnique({
    where: { userName },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "invalid username or password",
      },
      { status: 401 }
    );
  }
  const validPassword = await bcrypt.compare(password, user!.password);
  if (!validPassword)
    return NextResponse.json(
      {
        message: "invalid username or password",
      },
      { status: 401 }
    );
  const access_token = jwt.sign({ userId: user?.id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  const expiresAt = new Date();
  try {
    const token = await prisma.token.create({
      data: {
        userId: user.id,
        token: access_token,
        expiresAt: new Date(expiresAt.setHours(expiresAt.getHours() + 1)),
      },
    });

    return NextResponse.json(
      {
        ACCESS_TOKEN: access_token,
        userName: user.userName,
        id: user.id,
      } as LoginResponseType,
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
