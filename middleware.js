import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//API Paths to be restricted.
const protectedRoutes = ["/ai"]; 

export default async function middleware(request) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request
    });
    // check not logged in.
    if (!token) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
 }
 return res;
}
