import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/helpers";

export async function middleware(request: NextRequest) {
  const token = await getCookie("accessToken");

  const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

  if (!token) {
    // return NextResponse.redirect(new URL("/unauthorized", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = await fetch(`${BACK_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (data.error) {
    // return NextResponse.redirect(new URL("/unauthorized", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Solo aplica a rutas que empiezan con /admin
export const config = {
  matcher: ["/checkout/:path*"],
};
