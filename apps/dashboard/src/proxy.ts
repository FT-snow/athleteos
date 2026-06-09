import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isLoginPage = createRouteMatcher(["/login"]);
const isAuthRoute = createRouteMatcher(["/api/auth(.*)"]);
const isMetadataRoute = createRouteMatcher(["/icon", "/icon(.*)"]);

export const proxy = convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isLoginPage(request) || isAuthRoute(request) || isMetadataRoute(request)) {
    return;
  }
  const isAuthenticated = await convexAuth.isAuthenticated();
  if (!isAuthenticated) {
    console.log("[proxy] isAuthenticated returned false, redirecting to /login");
    return nextjsMiddlewareRedirect(request, "/login");
  }
}, { convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL, verbose: true });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
