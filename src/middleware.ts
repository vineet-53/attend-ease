import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { ACCOUNT_TYPES } from "@/types/account-types";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const isFacultyRoute = createRouteMatcher(["/faculty(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  let { sessionClaims, redirectToSignIn } = await auth();
  // Public routes don't require authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  await auth.protect();

  const userRole = sessionClaims?.metadata?.role;

  if (!userRole) {
    return redirectToSignIn();
  }
  if (userRole == ACCOUNT_TYPES.ADMIN) {
    return NextResponse.next();
  }

  if (isFacultyRoute(req) && userRole !== ACCOUNT_TYPES.FACULTY) {
    console.log("You are in faculty routes");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isStudentRoute(req) && userRole !== ACCOUNT_TYPES.STUDENT) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute(req) && userRole !== ACCOUNT_TYPES.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
