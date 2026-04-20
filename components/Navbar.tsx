"use client";

import Link from "next/link";

import UserNavbarProfile from "./UserNavbarProfile";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Search from "./Search";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-8 z-999 overflow-hidden m-8 rounded-2xl">
      <div className="w-full h-15 md:h-20 flex shadow bg-white dark:bg-[#06081A] dark:shadow-2xl">
        <div className="w-[95%] flex justify-between mx-auto items-center">
          <div className="flex gap-5 items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="w-30 h-30 md:w-40 md:h-30 relative mt-5 md:mt-0"
              >
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
              <Link
                href="/videos"
                className={`${pathname === "/events" ? "border-b-3 border-[#9790EF] text-[#645BD2]" : ""}`}
              >
                Videos
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex w-full">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <IoIosSearch
              className="block md:hidden dark:text-[#B0B7CE] mr-5 text-zinc-500"
              size={23}
              onClick={() => setIsOpen(!isOpen)}
            />
            <UserNavbarProfile />
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="block gap-6 md:hidden w-full text-zinc-600 dark:bg-[#06081A] bg-white pb-2 ">
        <div className="w-full flex justify-center gap-6 text-sm mb-4 pb-3">
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

        {isOpen && <Search />}
      </div>
    </div>
  );
};

export default Navbar;
