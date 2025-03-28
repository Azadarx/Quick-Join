import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quick Join",
  description: "Live Face to Face interaction Application",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      <footer className="text-center py-4">Footer</footer>
    </div>
  );
};

export default HomeLayout;
