import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type Permission = 
  | "Add student"
  | "Approve/reject application"
  | "Audit"
  | "Send Application"
  | "Certificate"
  | "Induction"
  | "Learning Platform";

const PUBLIC_PATHS = ["/signIn", "/signup", "/forgotPassword", "/reset-password"];
const DASHBOARD_PERMISSIONS: Record<string, Permission> = {
  "/recruiter-dashboard": "Add student",
  "/accessor-dashboard": "Approve/reject application",
  "/auditor-dashboard": "Audit",
  "/bksd-dashboard": "Send Application",
  "/certificate-dashboard": "Certificate",
  "/induction-dashboard": "Induction",
  "/lazer-dashboard": "Learning Platform"
};

const middleware = async (request: NextRequest) => {
  try {
    const { pathname } = request.nextUrl;
    
    const permissionsCookie = cookies().get('permissions')?.value;
    const userPermissions: Permission[] = permissionsCookie ? JSON.parse(permissionsCookie) : [];

    if (userPermissions.length > 0 && PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (userPermissions.length === 0) {
      const isProtectedRoute = Object.keys(DASHBOARD_PERMISSIONS).some(path => 
        pathname.startsWith(path)) || pathname.startsWith("/admin");
      
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/signIn", request.url));
      }
      return NextResponse.next();
    }

    
    // if ((pathname === "/admin" || pathname.startsWith("/admin/")) && userPermissions.length <= 4) {
    //   return NextResponse.redirect(new URL("/no-access", request.url));
    // }

    const matchingDashboard = Object.entries(DASHBOARD_PERMISSIONS).find(([path]) => 
      pathname.startsWith(path));
    
    if (matchingDashboard && !userPermissions.includes(matchingDashboard[1])) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
};

export const config = {
  matcher: [
    "/admin/:path*",
    "/recruiter-dashboard/:path*",
    "/accessor-dashboard/:path*",
    "/auditor-dashboard/:path*",
    "/bksd-dashboard/:path*",
    "/certificate-dashboard/:path*",
    "/induction-dashboard/:path*",
    "/lazer-dashboard/:path*",
    "/signIn",
    "/signup",
    "/forgotPassword",
    "/reset-password",
    "/",
    "/api/:path*"
  ],
};

export default middleware;