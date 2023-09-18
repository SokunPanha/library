import React from 'react'

export default function Btn({children, onClick, className, type }:any) {
  return (
    <button type={type} onClick={onClick} className={`duration-200 ease-in-out transition active:scale-105 rounded-lg p-2 ${className}`}>{children}</button>
  )
}
