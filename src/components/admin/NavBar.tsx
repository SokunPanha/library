"use client"
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Spinner from '../Spin'
import ToggleTheme from '../toggleTheme'
import { useSession } from 'next-auth/react'
import { useReadLocalStorage } from 'usehooks-ts'
import Drawer from './Drawer'
export default function NavigationBar() {
  const [isLoading, setLoading] = useState(false)
  const darkMode = useReadLocalStorage("theme")
  const {data:session} = useSession()
  return (
    <Fragment>
       {isLoading &&  <Spinner/>}
       <Drawer/>
    <div className={`navbar bg-base-100 animate-dimScreen  fixed top-0 left-0 ${darkMode == "dark" ? " border-gray-700 border-b-[1px] ":"border-gray-300 border-b-[1px]"}`}  >
    <div className="flex-1 gap-4">
      <label className="hover:cursor-pointer active:scale-110" htmlFor="my-drawer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

      </label>
  
     <label  className=" normal-case text-xl"> HSK Library</label>
    
       <div className="form-control">
        <input type="text" placeholder="Search" className="input border h-10 focus:border-gray-400 border-gray-800 focus:outline-none w-96" />
      </div>
    </div> 
   
    <div className="flex-none gap-2">
       <div className=' flex justify-center items-center'> 
        <ToggleTheme float={false}/>
        </div>
      <div className="dropdown dropdown-end ">
      
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
           <Image width={100} height={100} className='w-auto' alt='' src={session?.user?.image!} /> 
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a  className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li onClick={()=>{
            setLoading(true)
            signOut()
          }}><a >Logout</a></li>
        </ul>
      </div> 
    </div>
  
  </div>
  </Fragment>
  )
}
