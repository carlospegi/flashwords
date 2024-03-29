import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/libs/SessionProvider";

import { getServerSession } from "next-auth";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


const session = await getServerSession();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
