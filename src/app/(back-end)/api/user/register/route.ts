import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {ZodError} from "zod"
import { UserRegiterType } from "@/utils/AnyVariable";
import prisma from "../../../../../../prisma/prisma";
import { useRouter } from "next/navigation";
export async function POST(request: NextRequest){
          try{
                    let route=""
                    const body = await request.json();
          const {username, email, password } = body
          UserRegiterType.parse(body)
          const userExisting = await prisma.user.findUnique({
                    where:{email}
          }) 
          if(userExisting){
                    return NextResponse.json({message:`${email} is already in use!`}, {status:401})
          }
          const hashPassowrd = await bcrypt.hash(password,10);
          const user = await prisma.user.create({
                    data:{
                              email,
                              name:username,
                              password:hashPassowrd
                    }
          })
         
          if(user)
          return NextResponse.json({message:"User created successfully!",},{status:200})
          }catch(err){
          //         if(err instanceof ZodError)
          //           return NextResponse.json({message:err})
          //        else{
                    return NextResponse.json({message:"Internal server error"}, {status:500})
          //        }
          }
          
}

