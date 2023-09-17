"use client"
import React, { useState } from 'react'
import {signOut} from "next-auth/react"
import { useSession } from 'next-auth/react'
import Spinner from '@/components/Spin'
export default function UserPage() {
  const [isLoader, setLoader] = useState(false)
  const {data:session} = useSession()
  return (
    <div>UserPage
          {JSON.stringify(session)}
      <button onClick={()=> signOut({callbackUrl:"/login"})}>Sign Out</button>  
      {isLoader && <Spinner/>}
    </div>
  )
}
