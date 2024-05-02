import createMiddleware from 'next-intl/middleware';

import { locales, localePrefix, pathnames } from './navigation';

import { NextRequest, NextResponse } from "next/server"


export default createMiddleware({
  defaultLocale: 'ru',
  localePrefix,
  locales,
  pathnames
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en|uz)/:path*']
};