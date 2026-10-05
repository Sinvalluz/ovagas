import { cookies } from "next/headers";
import { type NextRequest, NextResponse, type ProxyConfig } from "next/server";

const publicRoutes = [
	{ path: "/register", whenAuthenticated: "redirect" },
	{ path: "/login", whenAuthenticated: "redirect" },
	{ path: "/home", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export async function proxy(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token")?.value;

	if (!accessToken && publicRoute) {
		return NextResponse.next();
	}

	if (!accessToken && !publicRoute) {
		const redirectUrl = request.nextUrl.clone();

		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

		return NextResponse.redirect(redirectUrl);
	}

	if (accessToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		const redirectUrl = request.nextUrl.clone();

		redirectUrl.pathname = "/";

		return NextResponse.redirect(redirectUrl);
	}

	if (accessToken && !publicRoute) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config: ProxyConfig = {
	matcher: [
		// Exclude API routes, static files, image optimizations, and .png files
		"/((?!api|_next/static|_next/image|.*\\.svg|_next/image|.*\\.png$).*)",
	],
};
