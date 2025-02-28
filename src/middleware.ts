import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/notifications"];

// Add routes that should not be accessible when authenticated
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("privy-token");
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/notifications",
    "/login",
    "/register"
  ]
};
