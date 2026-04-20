"use client";

import Link from "next/link";

import UserNavbarProfile from "./UserNavbarProfile";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-8 z-999 overflow-hidden m-8 rounded-2xl">
      <div className="w-full h-15 md:h-20 flex shadow bg-white dark:bg-[#080D21] dark:shadow-2xl">
        <div className="w-[95%] flex justify-between mx-auto items-center">
          <div className="flex gap-5 items-center">
            <div className="flex items-center">
              <Link href="/" className="w-30 h-30 md:w-40 md:h-40 relative">
                <Image
                  src="/images/logo.png"
                  fill
                  alt="Clarity Lenz Logo"
                  className="absolute object-cover"
                />
              </Link>
            </div>

            <div className="hidden md:flex w-full gap-4 text-zinc-600 text-sm font-semibold tracking-wide ">
              <Link
                className={`${pathname === "/" ? "border-b-3 border-[#9790EF] text-[#645BD2]" : ""}`}
                href="/"
              >
                Home
              </Link>
              <Link
                href="/articles"
                className={`${pathname === "/articles" ? "border-b-3 border-[#9790EF] text-[#645BD2]" : ""}`}
              >
                Articles
              </Link>
              <Link
                href="/events"
                className={`${pathname === "/events" ? "border-b-3 border-[#9790EF] text-[#645BD2]" : ""}`}
              >
                Events
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex w-full">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <UserNavbarProfile />
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="block gap-6 md:hidden w-full dark:bg-zinc-950 bg-white pb-2 ">
        <div className="w-full flex justify-center gap-6 text-lg mb-4 bg-black pb-3 text-white">
          <Link
            href="/"
            className={`${pathname === "/" ? "border-b-3 border-[#363384]" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/articles"
            className={`${pathname === "/articles" ? "border-b-3 border-[#363384]" : ""}`}
          >
            Articles
          </Link>
          <Link
            href="/events"
            className={`${pathname === "/events" ? "border-b-3 border-[#363384]" : ""}`}
          >
            Events
          </Link>
        </div>

        <Search />
      </div>
    </div>
  );
};

export default Navbar;
