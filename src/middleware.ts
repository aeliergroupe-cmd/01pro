import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export const config = {
  matcher: ['/account/:path*'],
};

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
