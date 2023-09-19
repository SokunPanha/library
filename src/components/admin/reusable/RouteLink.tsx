import Link from 'next/link'
import React, { Fragment, ReactElement, useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
interface LinkType{
          children?: any 
          label: string
          className?: string
          routePath:string
          onClick?: ()=>void
}
export default function RouteLink({children,label,routePath, onClick, className}:LinkType) {
          const [theme, setTheme] = useState("")
          const {Theme} = useTheme()
          useEffect(()=>{
                    setTheme(Theme)
          },[Theme])

  return (
    <Fragment>
             <Link onClick={onClick} className={`${className} flex gap-3  px-4  duration-300 ease-linear  ${
                  theme == "dark" 
                    ? "  hover:bg-white hover:text-black"
                    : "text-black hover:bg-gray-200"
                }  p-2 rounded-lg`} href={routePath}>
         <span>{children}</span>
         <span>{label}</span>
         </Link>
    </Fragment>
  )
}
