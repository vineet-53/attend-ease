import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const isFacultyRoute = createRouteMatcher(["/faculty(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  "use server";
  const { userId, redirectToSignIn } = await auth();

  // user must be signed in to access url
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  // Fetch the user's role from the session claims
  // @ts-ignore
  const client = await clerkClient();
  const user = userId && (await client.users.getUser(userId));
  if (!user) {
    return redirectToSignIn();
  }
  const userRole = user?.publicMetadata?.role;
  console.log(userRole);
  if (userRole == "admin") {
    return NextResponse.next();
  }

  if (isFacultyRoute(req) && userRole !== "faculty") {
    console.log("You are in faculty routes");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isStudentRoute(req) && userRole !== "student") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute(req) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
