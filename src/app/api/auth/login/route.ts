// app/api/hello/route.ts
import bcrypt from "bcrypt";
import { prisma } from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export async function POST(request: NextRequest) {
  const SECRET_KEY = process.env.NEXT_JWT_SECRET_KEY || "";
  try {
    console.log("SSSSSS", await request.body);
    const { userName, password } = await request.json();
    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid username or password!" },
        { status: 401, statusText: "invalid username or password" }
      );
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    const now = new Date(Date.now());

    // * EXPIRATION in 1 hour

    // const tokenExp = new Date(now.setHours(now.getHours() + 1));
    // const refTokenExp = new Date(now.setHours(now.getHours() - 1 + 7 * 24));

    // console.log(refTokenExp, tokenExp);

    // await prisma.token.create({
    //   data: { token, expiresAt: tokenExp, userId: user.id },
    // });

    // await prisma.refreshToken.create({
    //   data: { refreshToken, expiresAt: refTokenExp, userId: user.id },
    // });

    const serializedRefreshToken = serialize("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 1000,
      path: "/",
    });

    return NextResponse.json(
      {
        token,
        refreshToken: refreshToken,
        userName: user.userName,
        id: user.id,
      },
      {
        status: 200,
        headers: {
          "set-cookie": serializedRefreshToken,
        },
      }
    );

    // return NextResponse.json(
    // {
    //   token,
    //   refreshToken: refreshToken,
    //   userName: user.userName,
    //   id: user.id,
    // },
    //   {
    //     status: 200,
    //     headers: {
    //       "Set-Cookie": serialized,
    //     },
    //   }
    // );
  } catch (e) {
    console.log("ERROR", e);
    return NextResponse.json(
      { message: "an error occurred during login" },
      { status: 500 }
    );
  }
}
