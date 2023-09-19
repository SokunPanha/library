"use client"
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Spinner from '../Spin'
import ToggleTheme from '../toggleTheme'
import { useSession } from 'next-auth/react'
import Drawer from './Drawer'
import { useTheme } from '@/context/ThemeContext'
import { MenuBar } from './icon/hero-icon'
import RouteLink from './reusable/RouteLink'
export default function NavigationBar() {
  const [isLoading, setLoading] = useState(false)
  const [themeMode, setTheme] = useState("");

  const {Theme} = useTheme()
  useEffect(()=>{
   setTheme(Theme)
  },[Theme])
  const {data:session} = useSession()
  return (
    <Fragment>
       {isLoading &&  <Spinner/>}
       <Drawer/>
    <div className={`navbar bg-base-100 animate-dimScreen  fixed top-0 left-0 ${themeMode == "dark" ? " border-gray-700 border-b-[1px] ":"border-gray-300 border-b-[1px]"}`}  >
    <div className="flex-1 gap-4">
      <label className="hover:cursor-pointer active:scale-110" htmlFor="my-drawer">
     {
      session?.user?.role == "ADMIN" && <MenuBar/>
     }

      </label>
  
     <label  className=" normal-case text-xl"> HSK Library</label>
    
    </div> 
   
    <div className="flex-none gap-2">
       <div className=' flex justify-center items-center'> 
        <ToggleTheme float={false}/>
        </div>
      <div className="dropdown dropdown-end ">
      
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
           <Image width={100} height={100} className='w-auto' alt='' src={session?.user.image==null ? "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg":session.user.image} /> 
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2  shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {/* proifle  */}
         <RouteLink className="text-sm"  label='Profile' routePath="/profile" />
          
          {/* log out  */}
          <RouteLink className="text-sm" onClick={()=>{
            setLoading(true)
            signOut()
          }} routePath='' label='Log out'/>
        </ul>
      </div> 
    </div>
  
  </div>
  </Fragment>
  )
}
