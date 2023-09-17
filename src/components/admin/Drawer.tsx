"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
export default function Drawer() {
  const [darkMode, setTheme] = useState("");
  const mode = useReadLocalStorage("theme") as any;
  useEffect(() => {
    setTheme(mode);
  });
  return (
    <Fragment>
      <div className="drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer"
            className={`${
              darkMode == "dark" ? "bg-black opacity-40" : "bg-white opacity-40"
            } fixed w-full z-10 h-screen`}
          ></label>
          <ul className="menu z-20 p-4 fixed w-80 min-h-full bg-base-100 text-base-content">
            {/* Sidebar content here */}
            <div className="mt-20">
              <Link
                className={`flex gap-3 items-center text-lg duration-300 ease-linear  ${
                  darkMode == "dark"
                    ? " text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-gray-200"
                }  p-2 rounded-lg`}
                href={"/dashboard"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <span>Book Management</span>
              </Link>



              <Link
                className={`flex gap-3 items-center text-lg duration-300 ease-linear  ${
                  darkMode == "dark"
                    ? " text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-gray-200"
                }  p-2 rounded-lg`}
                href={"/dashboard/category"}
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
</svg>

                <span>Category</span>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
