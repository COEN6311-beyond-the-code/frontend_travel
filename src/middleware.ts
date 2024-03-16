import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const signedIn = request.cookies.get('token');
	const userInfo =
		request.cookies.get('userInfo') &&
		JSON.parse(request.cookies.get('userInfo')?.value!);

	if (signedIn) {
		if (
			request.nextUrl.pathname === `/sign-in` ||
			request.nextUrl.pathname === `/sign-up`
		) {
			return NextResponse.redirect(
				new URL('/search', request.nextUrl.origin),
			);
		}
	}

	if (signedIn && userInfo.isAgent) {
		if (request.nextUrl.pathname.startsWith('/dashboard/user')) {
			return NextResponse.redirect(
				new URL('/dashboard/agent/orders', request.nextUrl.origin),
			);
		}
	} else if (signedIn && !userInfo.isAgent) {
		if (request.nextUrl.pathname.startsWith('/dashboard/agent')) {
			return NextResponse.redirect(
				new URL('/dashboard/user/orders', request.nextUrl.origin),
			);
		}
	}

	if (!signedIn) {
		if (request.nextUrl.pathname.startsWith('/dashboard')) {
			return NextResponse.redirect(
				new URL('/sign-in', request.nextUrl.origin),
			);
		}
	}

	if (!signedIn) {
		if (request.nextUrl.pathname.startsWith(`/checkout`)) {
			return NextResponse.redirect(
				new URL('/sign-in', request.nextUrl.origin),
			);
		}
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		'/sign-in',
		'/sign-up',
		'/dashboard/agent/:path*',
		'/dashboard/user/:path*',
		'/checkout',
		'/checkout/:path*',
	],
};
