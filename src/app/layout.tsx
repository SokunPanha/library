
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import ToastContext from "@/context/ToastContext";
import { ThemeProvider, useTheme} from "@/context/ThemeContext";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" data-them= "light" >
      <body  className={`${inter.className} animate-dimScreen`}>
        <Provider>
         <ThemeProvider>
      {children}
      </ThemeProvider>
        <ToastContext />
        </Provider>
      </body>
    </html>
  );
}
