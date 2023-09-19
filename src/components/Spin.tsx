"use client"
import { Waveform } from '@uiball/loaders'

import React from 'react'

export default function Spinner() {
  return (
          <div className="h-screen w-full fixed top-0 z-50 flex justify-center bg-black bg-opacity-40 items-center"> 
          <Waveform 
          size={40}
          lineWeight={3.5}
          speed={1} 
          color={"white"}
         />
         </div>
  )
}
