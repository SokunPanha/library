"use client"
import { useSession } from "next-auth/react";

import Link from "next/link";
export default function Page () {
  const {data:session} = useSession()
  return (
    <>
   <div className="hero min-h-screen animate-dimOverlay" style={{backgroundImage: 'url(https://www.eui.eu/Content-Types-Assets/Web-Unit/Student-in-law-library-section.x7622d211.jpg?w=1920&h=1080)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    
    <div className="max-w-md">

      <h1 className="mb-5 text-5xl text-white w-full font-bold">Welcome <span className="text-blue-500">{session?.user?.name}</span> to <br />  E-Library</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <Link href="/login" ><button className="btn btn-primary animate-bounce" >Get Started</button></Link>
    </div>
  </div>
</div>
  </>
  );
};