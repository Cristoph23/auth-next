import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export function middleware(request) {
  const jwt = request.cookies.get("myTokenName");
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = jwtVerify(jwt, new TextEncoder().encode("secret"));
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
    matcher: ['/dashboard', '/', '/admin/:path*']
}