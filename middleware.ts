import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const protectedRoutes = [
  "/",
  "/categories",
  "/change-password",
  "/products",
  "/transactions",
];

export async function middleware(req: NextRequest) {
  console.log("Middleware running on:", req.nextUrl.pathname);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If the user is not authenticated, redirect to login page
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Use a literal array in the config export for static analysis
export const config = {
  matcher: [
    "/",
    "/categories",
    "/change-password",
    "/products",
    "/transactions",
  ],
};
