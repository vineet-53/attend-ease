import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const isFacultyRoute = createRouteMatcher(["/faculty(.*)"]);

export const ACCOUNT_TYPES = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  FACULTY: "FACULTY",
};

const authMiddleware = clerkMiddleware(async (auth, req) => {
  let { userId, redirectToSignIn } = await auth();

  // Public routes don't require authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // User must be signed in for protected routes
  await auth.protect();

  if (!userId) {
    return redirectToSignIn();
  }

  // Fetch user from Clerk
  const user = await (await clerkClient()).users.getUser(userId);

  if (!user) {
    return redirectToSignIn();
  }
  const userRole = user?.publicMetadata?.role;
  console.log(userRole);
  if (userRole == ACCOUNT_TYPES.ADMIN) {
    return NextResponse.next();
  }

  if (isFacultyRoute(req) && userRole !== ACCOUNT_TYPES.FACULTY) {
    console.log("You are in faculty routes");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isStudentRoute(req) && userRole !== ACCOUNT_TYPES["STUDENT"]) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute(req) && userRole !== ACCOUNT_TYPES.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export default authMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
