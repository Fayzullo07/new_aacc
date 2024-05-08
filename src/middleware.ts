import createMiddleware from 'next-intl/middleware';

import { locales, localePrefix, pathnames } from './navigation';

import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["admin"];
const isAuth = false;
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware((auth, req) => {
  const [, locale, ...segments] = req.nextUrl.pathname.split('/');

  // console.log(auth().sessionClaims?.metadata?.role);d

  if (!auth().userId && protectedRoutes.includes(req.nextUrl.pathname.split('/')[2])) {
    const absoluteURL = new URL(`/${locale}/sign-in`, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  // Step 1: Use the incoming request (example)
  const defaultLocale = req.headers.get('x-your-custom-locale') || 'ru';

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    defaultLocale: 'ru',
    localePrefix,
    locales,
    pathnames
  });
  const response = handleI18nRouting(req);

  // Step 3: Alter the response (example)
  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en|uz)/:path*']
};