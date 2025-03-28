import Link from "next/link";
import Image from "next/image";
import React from "react";
import MobileNav from "./mobilenav";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <nav className="flex flex-between fixed z-50 w-full bg-[#1c1f2e] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="QuickJoin Logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white">QuickJoin</p>
      </Link>
      <div className="flex flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar;
