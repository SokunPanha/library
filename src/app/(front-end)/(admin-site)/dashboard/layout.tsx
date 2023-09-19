
import NavigationBar from "@/components/admin/NavBar";
import React, { Fragment, useState } from "react";
 
export default function DashboardRootLayout({children}:{children: React.ReactNode}) {

  return (
<Fragment >
     <main className="animate-dimScreen ">
     <NavigationBar/>
     {children}
     </main>
    </Fragment>
  );
}