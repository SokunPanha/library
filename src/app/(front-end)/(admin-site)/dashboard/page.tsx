"use client"
import BookCreator from "@/components/admin/BookCreator";
import Search from "@/components/search";
import React from "react";

 
export default function StepperWithIcon() {

  return (
    <div className=" mt-24 z-0 bg-white px-10">
      {/* header search, filter, create  */}
      <div className="w-full">
        <Search />
        <BookCreator/>
      </div>
  </div>
  );
}
       