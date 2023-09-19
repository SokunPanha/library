"use client"
import React,{  createContext ,useContext} from 'react'
import  {useReadLocalStorage}  from 'usehooks-ts'
interface ThemeContextType { Theme: string; }
const ThemeContext = createContext<ThemeContextType>({Theme: " "})
export const useTheme= ()=> useContext(ThemeContext);
const  ThemeProvider  = ({children}:{children:React.ReactNode})=> {
  const Theme = useReadLocalStorage("theme") as string
  

          return (
   <ThemeContext.Provider  value={{Theme}}>
{children}
   </ThemeContext.Provider>
  )
}

export {ThemeProvider}
