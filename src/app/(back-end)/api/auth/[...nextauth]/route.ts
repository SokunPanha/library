import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  EmailProvider  from "next-auth/providers/email";
import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "../../../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt"

 const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentails",
      credentials:{
        username: {label:"eamil", type:"email"},
        password:  {label:"password", type:"password"},
      },
      async authorize(credentials:Record<| "password" | "username", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method"> ) {
          
        if (!credentials?.username || !credentials.password){
          throw new Error("Missing fill!")
     }
     const user =  await prisma.user.findUnique({where:{email: credentials.username}})

     if (!user){
          throw new Error("User not found!")
     }

     const validPassword = await bcrypt.compare(credentials.password, user.password!)
     if (!validPassword){
          throw new Error("Invalid password!")
     }

     return user;
        }
       
    })
     
    // ...add more providers here
  ],
callbacks:{
  async jwt({token, user, session}){
  const userDb = await prisma.user.findFirst({
    where:{email:token.email}
  })
  if(!userDb){
    token.id = user!.id
    return token;
  }
   return {
    ...token , id: userDb?.id! ,role: userDb.role
   }
  },
  async session({token, session, user}){
    session.user.id = token.id
    session.user.role = token.role
    return session;
  }
}
  ,
  secret: process.env.SECRET!,
  session: {
       strategy: "jwt",
       maxAge: 3600
       
  },
  
  debug: process.env.NODE_ENV == "development",

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

 