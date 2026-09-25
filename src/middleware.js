import { NextResponse } from "next/server";

// English lives at the root (/work/tawlead), Arabic under /ar (/ar/work/tawlead).
// Internally every route is served from the [locale] segment.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

    const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);
  if (first === "ar") return NextResponse.next({ request: { headers } });

  const url = request.nextUrl.clone();
  if (first === "en") {
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
