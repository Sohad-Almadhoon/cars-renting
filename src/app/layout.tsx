"use client";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import SideBar from "@/components/shared/SideBar";
import { useState } from "react";
import useSession from "./useSession";

// export const metadata: Metadata = {
//   title: "الأفندي",
//   description: "الأفندي لتأجير السيارات",
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebar, setSidebar] = useState(true);
  const session = useSession();
  return (
    <html lang="ar" style={{ height: "100%" }}>
      <body className="flex flex-col h-full">
        <div className="flex h-full transition-all">
          {" "}
          {session?.isLoggedIn && sidebar && <SideBar />}
          <main style={{ flex: 1, height: "calc(100% - 88px)" }}>
            <Header sidebar={sidebar} setSidebar={setSidebar} />
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
