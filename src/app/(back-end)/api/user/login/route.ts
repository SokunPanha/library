// import { NextResponse, NextRequest } from "next/server";
// import prisma from "../../../../../../prisma/prisma";


// export async function POST(request: NextRequest){
//           const body = await request.json();
//           const {username, password} = body
          
//           const user = await prisma.user.findUnique({
//                     where:{email:username, name:username}
//           })
//           if(!user) return NextResponse.json({message:"User not found"},{status:401})
//           const val
// }