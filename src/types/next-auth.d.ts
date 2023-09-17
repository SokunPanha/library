import { Role } from "@prisma/client"
import type { User } from "next-auth"
import "next-auth/jwt"

type UserID = string

declare module "next-auth/jwt"{
  interface JWT{
    id : UserID
    role: Role
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User &{
      id: UserID
      role?:Role
    }
  }
}