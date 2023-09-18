"use client"
import React, { Fragment, useState, forwardRef } from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
interface Input{
          name? : any | " "
          value? : string,
          type : string
          onChange? : (data:any)=> void
          className?: string
          placeholder?: string
          register? :any
          rules?:any
          errors?:any | undefined
          
}


export default function Input({className,register,errors, type, placeholder, onChange, value, name }:Input ) {
          const [toggle, setToggle] = useState(false)
      
        
  return (
          
    <Fragment>
          {type == "password" ? (
 <div className="input_container  relative  ">
 <input
   className={`input input-bordered ${className} ${errors[name]! && "border border-red-500 transition duration-150 ease-linear"}`}
   type={type == "password" ? (toggle ? "text" : "password") : type}
   placeholder={placeholder}
   onChange={onChange}
   {...register(name)}
   name={name}
 />
 
 {toggle ? (
   <p className="text-2xl mr-3 absolute top-3 right-2 " onClick={()=> setToggle(!toggle)}>
     <AiFillEye />{" "}
   </p>
 ) : (
   <p className="text-2xl mr-3  absolute top-3 right-2" onClick={()=>setToggle(!toggle)}>
     <AiFillEyeInvisible />
   </p>
 )}
 {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
</div>
          ):
          (
                    <div className="input_container  relative  ">
                    <input
                      className={`input input-bordered ${className} ${errors[name] && "border border-red-500 transition duration-150 ease-linear"} `}
                      type={type == "password" ? (toggle ? "text" : "password") : type}
                      value={value}
                      placeholder={placeholder}
                      onChange={onChange}
                      {...register(name)}
                      name={name}
                    />
 {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
                    
                  </div>
          )
          }
         
    </Fragment>
  )
}
