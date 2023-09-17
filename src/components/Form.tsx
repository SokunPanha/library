"use client"
import React from "react";
interface FormType{
  children ?: any 
  onSubmit ?: ()=> void
  onChange ?: (data:any)=> void
  className?: string
}
export default function Form({ children, onSubmit ,onChange, className}:FormType) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form onChange={onChange} onSubmit={onSubmit} className={`${className} flex gap-7 flex-col w-11/12 max-w-xl p-8 shadow-lg `}>
          {children}
      </form>
    </div>
  );
}
