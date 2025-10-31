import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/ESLP";
  return NextResponse.redirect(url);
}
