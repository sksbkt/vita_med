import { NextRequest, NextResponse } from "next/server";

// import { verifyToken } from "../lib/jwt";

export function middleware(request: NextRequest) {
  // console.log("MIDDLEWARE", request.url);

  return NextResponse.next();
  //   try {
  //     const token = request.cookies.get("authToken");

  //     if (!token) {
  //       return NextResponse.redirect(new URL("/login", `${request.url.origin}`));
  //     }

  //     // const decoded = verifyToken(token);

  //     if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
  //       return NextResponse.redirect(new URL("/login", `${request.url.origin}`));
  //     }

  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //     return NextResponse.status(401).json({ message: "Unauthorized" });
  //   }
}
