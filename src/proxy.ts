
import { NextRequest, NextResponse } from "next/server";

interface IRefreshResponse {
  accessToken: string;
}

const isTokenExpiring = (token: string): boolean => {
  try {
    const payload = token.split(".")[1];

    if (!payload) return false;

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = JSON.parse(
      atob(normalizedPayload)
    );

    if (typeof decodedPayload.exp !== "number") {
      return false;
    }

    return decodedPayload.exp * 1000 <= Date.now() + 30_000;
  } catch {
    return false;
  }
};

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken && !isTokenExpiring(accessToken)) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    if (!accessToken) {
      return NextResponse.next();
    }

    const response = NextResponse.next();

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("userId");

    return response;
  }

  try {
    const refreshResponse = await fetch(
      `${process.env.API_URL?.replace(/\/$/, "")}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
        cache: "no-store",
      }
    );

    if (!refreshResponse.ok) {
      if (refreshResponse.status === 401) {
        const response = NextResponse.next();

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        response.cookies.delete("userId");

        return response;
      }

      return NextResponse.next();
    }

    const data: IRefreshResponse = await refreshResponse.json();

    if (!data.accessToken) {
      return NextResponse.next();
    }

    request.cookies.set("accessToken", data.accessToken);

    const response = NextResponse.next({
      request,
    });

    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error);

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
