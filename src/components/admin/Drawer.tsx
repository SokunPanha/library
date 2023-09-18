"use client";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { CategoryIcon, BookIcon } from "./icon//hero-icon";
import RouteLink from "./reusable/RouteLink";
export default function Drawer() {
  const [themeMode, setTheme] = useState("");

  const {Theme} = useTheme()
  useEffect(()=>{
   setTheme(Theme)
  })
  return (
    <Fragment>
      
      <div className="drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer"
            className={`${
              themeMode == "dark" ? "bg-black opacity-40" : "bg-white opacity-40"
            } fixed w-full z-10 h-screen`}
          >
            
          </label>
          <ul className="menu z-20 p-4 fixed w-80 min-h-full bg-base-100 text-base-content">
            {/* Sidebar content here */}
            <div className="mt-20">
              {/* book management  */}
            <RouteLink label="Book Mangement" routePath="/dashboard" className="text-lg">
            <BookIcon/>
            </RouteLink>
 {/* category management  */}
            <RouteLink label="Category Management" routePath="/dashboard/category" className="text-lg">
            <CategoryIcon/>
            </RouteLink>
            </div>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
