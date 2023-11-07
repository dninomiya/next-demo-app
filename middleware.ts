import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/welcome'],
  skipJwksCache: true,
  async afterAuth(auth, req) {
    if (!auth.userId && auth.isPublicRoute) {
      return;
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    let onboarded = auth.sessionClaims?.onboarded;

    if (!onboarded) {
      const user = await clerkClient.users.getUser(auth.userId!);
      onboarded = user.publicMetadata.onboarded;
    }

    if (!onboarded && req.nextUrl.pathname !== '/onboarding') {
      const orgSelection = new URL('/onboarding', req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (onboarded && req.nextUrl.pathname === '/onboarding') {
      const orgSelection = new URL('/', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
