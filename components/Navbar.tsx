import Link from "next/link";
import { Separator } from "./ui/separator";

import UserNavbarProfile from "./UserNavbarProfile";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="sticky top-0 ">
      <div className="w-full h-15  md:h-20 flex shadow bg-black">
        <div className="w-[90%] flex justify-between mx-auto items-center">
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
              <Separator
                orientation="vertical"
                className="bg-zinc-600 h-10! hidden md:block"
              />
            </div>

            <div className="hidden md:flex w-full bg-black">
              <Link href="/">Home</Link>
              <Link href="/articles">Articles</Link>
              <Link href="/events">Events</Link>
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
      <div className="block gap-6 md:hidden w-full dark:bg-zinc-950 bg-white pb-2">
        <div className="w-full flex justify-center gap-2 text-sm mb-4 bg-black pb-3">
          <Link href="/">Home</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/events">Events</Link>
        </div>

        <Search />
      </div>
    </div>
  );
};

export default Navbar;
