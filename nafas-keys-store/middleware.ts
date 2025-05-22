import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const isAdmin = token?.role === "admin"

  // الحصول على المسار الحالي
  const path = request.nextUrl.pathname

  // حماية مسارات لوحة التحكم (يجب أن يكون المستخدم مسجل الدخول ومسؤول)
  if (path.startsWith("/dashboard")) {
    if (!isAuthenticated || !isAdmin) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(url)
    }
  }

  // حماية مسارات الحساب (يجب أن يكون المستخدم مسجل الدخول)
  if (path.startsWith("/account")) {
    if (!isAuthenticated) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// تكوين المسارات التي سيتم تطبيق الوسيط عليها
export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
}
