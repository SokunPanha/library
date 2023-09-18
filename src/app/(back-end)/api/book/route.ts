import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession()
 if(session && session.user){
          const body = await request.json();
          const {title, description,authorName, categoryName, publishDate, number} = body
          const bookExist = await prisma.book.findFirst({where:{title}})
         if (bookExist){
          return  NextResponse.json({message:"Book already exist"})
         }
          const book = await prisma.book.create({
                    data: {
                      title,
                      description,
                      publishDate,
                      number,
                      // connect or create an author by name
                      author: {
                        connectOrCreate: {
                          where: { name: authorName },
                          create: { name: authorName },
                        },
                      },
                      // connect or create a category by name
                      category: {
                        connectOrCreate: {
                          where: { category_name: categoryName },
                          create: { category_name: categoryName },
                        },
                      },
                    },
                    include: {
                      author: true,
                      category: true,
                    },
                  });
                  
        
          console.log(book.title);
          console.log(book.category_Id);
        
          return NextResponse.json({message: "New book created successfully!"},{status:200})
                }
                else{
                  return   NextResponse.json("unauthorized!")
                }
        }