import { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signOut } from 'next-auth/react';
import { rbac } from './lib/rbac';
import { IUser } from '@/lib/auth/interfaces';

interface IToken extends JWT {
  user: IUser;
}

const authMiddleware = withAuth(
  async (req) => {
    const url = req.nextUrl;
    const { pathname } = url;
    const userRole = (req?.nextauth?.token as IToken).user?.role?.toUpperCase();
    if (!userRole) {
      await signOut();
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname === '/') {
      if (userRole) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
    const allowedRoutes = rbac
      .filter(({ rolesAllowed }) => rolesAllowed.includes(userRole))
      .map(({ path }) => path);
    if (!allowedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/no-access', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (!req.nextUrl.pathname.startsWith('/login') && token === null) {
          return false;
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith('/api')) {
    if (!req.headers.get('referer')?.includes(process.env.NEXT_APP_URL!)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|placeholder|wasm|sam.wasm|sam_simd.wasm|loading|public|icon.ico|favicon.ico|logo|bg-login|header-texture|sw.js).*)',
  ],
};
