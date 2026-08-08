import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionTokenValid } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminPath =
    pathname === "/admin/login" || pathname === "/api/admin/login";
  if (!isPublicAdminPath) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const valid = await isSessionTokenValid(token);
    if (!valid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
