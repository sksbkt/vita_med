import { NextRequest, NextResponse } from "next/server";
export async function GET(NextRequest: NextRequest) {
  return NextResponse.json(
    { message: "an error occurred during login" },
    { status: 500 }
  );
}
