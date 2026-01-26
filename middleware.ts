import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN = "admin_session";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin")) return NextResponse.next();
  if (path === "/admin/login") return NextResponse.next();

  const v = req.cookies.get(ADMIN)?.value;
  if (v !== "1") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/((?!login).*)"] };
