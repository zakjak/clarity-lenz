import Link from "next/link";
import { Separator } from "./ui/separator";

import UserNavbarProfile from "./UserNavbarProfile";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Search from "./Search";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-18  md:h-22 flex shadow">
        <div className="w-[90%] flex justify-between mx-auto items-center">
          <div className="flex gap-5 items-center">
            <div className="flex items-center">
              <Link href="/" className="w-40 h-40 relative">
                <Image
                  src="/images/logo.png"
                  fill
                  alt="Clarity Lenz Logo"
                  className="absolute object-cover"
                />
              </Link>
              <Separator orientation="vertical" className="bg-zinc-600 h-10!" />
            </div>

            <div className="flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/articles">articles</Link>
              <Link href="/events">events</Link>
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
      <div className="flex md:hidden mb-10">
        <Search />
      </div>
    </>
  );
};

export default Navbar;
