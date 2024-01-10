import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // Check: is logged in
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  /**
   * This is routes for next auth
   */

  if (isApiAuthRoute) {
    return null;
  }

  /**
   * Checkz: if auth routes likes ["/login", "/sign-up"]
   * If auth routes and user already logged in then user will redirect to the [DEFAULT_LOGIN_REDIRECT]
   * if auth routes and user not logged in then user can see the auth routes to sign-up or login
   */
  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  /**
   * Check: if user not loggedin and not the public routes . Means this is protected routes like ["/profile"]
   * If user try to visit protected routes but not logged in then user will redirect to the login page to complete login process
   * Otherwise user can see the protected routes
   */

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
