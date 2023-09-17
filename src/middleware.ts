import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request:NextRequest){

  const token = await getToken({req:request, secret:process.env.SECRET})
  const pathname = request.nextUrl.pathname
  const isPublicPath = pathname == "/login" || pathname == "/signup" 
  const isPrivatePath = pathname.startsWith("/dashboard") || pathname.startsWith("/user")
  

 //admin protected route

 if (isPublicPath && token?.role == "ADMIN"){
   return NextResponse.redirect(new URL("/dashboard", request.nextUrl))

 }
 if(pathname.startsWith("/user") && token?.role =="ADMIN"){
   return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  }

  //user protected route
  if(isPublicPath  && token?.role == "USER"){
   return NextResponse.redirect(new URL("/user", request.nextUrl))
  }
  
  if(pathname.startsWith("/dashboard") && token?.role == "USER"){
   return NextResponse.redirect(new URL("/user", request.nextUrl))

  }

 

  if (isPrivatePath && !token){
   return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
  
}

export const config={
  matcher:[
   "/user",
    "/user/:path*",
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/:path*"
  ]
}