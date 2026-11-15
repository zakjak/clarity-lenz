"use client";

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarTrigger,
  MenubarRadioItem,
} from "@/components/ui/menubar";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { FaChevronRight, FaRegCalendar } from "react-icons/fa6";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Separator } from "./ui/separator";
import { GoHome } from "react-icons/go";
import { FaMoon, FaRegUser } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { CiCalendarDate, CiSun } from "react-icons/ci";
import { FiPlayCircle } from "react-icons/fi";
import { PiBagSimple } from "react-icons/pi";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { slugify } from "@/lib/utils/helpers";

const MenuList = () => {
  const { data: session } = authClient.useSession();
  const { setTheme, theme } = useTheme();
  return (
    <Menubar className="block md:hidden">
      <MenubarMenu>
        <MenubarTrigger>
          <IoMenuOutline />
        </MenubarTrigger>
        <MenubarContent className="w-70">
          <div className="hidden items-center  overflow-hidden  dark:flex">
            <div className=" relative w-16 h-10">
              <Link href="/" className="mt-5 md:mt-0">
                <Image
                  src="/images/logo_lightmode.png"
                  fill
                  alt="Clarity Lenz Logo"
                  className="absolute object-cover w-30 h-30  object-top"
                />
              </Link>
            </div>
            <h3 className="text-xs font-black relative top-1">
              <span className="text-blue-950 dark:text-zinc-300">
                Clarity <span className="text-yellow-500">Lenz</span>
              </span>
            </h3>
          </div>

          <div className="flex items-center  overflow-hidden  dark:hidden">
            <Link href="/" className="mt-5 md:mt-0 cursor-pointer">
              <div className="relative w-16 h-10">
                <Image
                  src="/images/logo_lightmode.png"
                  fill
                  alt="Clarity Lenz Logo"
                  className="absolute object-cover w-30 h-30  object-top"
                />
              </div>
              <h3 className="text-xs font-black relative top-1">
                <span className="text-blue-950">
                  Clarity <span className="text-yellow-500">Lenz</span>
                </span>
              </h3>
            </Link>
          </div>
          <Separator className="mt-2" />
          <Link
            className="flex items-center pt-2 px-3 gap-2 relative hover:bg-zinc-100 dark:hover:bg-zinc-800"
            href={`/profile/${session?.user?.id}/${slugify(session?.user?.name as string)}`}
          >
            <Avatar
              size="lg"
              className="cursor-pointer border-2 border-violet-300"
            >
              <AvatarImage
                src={session?.user?.image as string}
                alt={`Profile of ${session?.user?.name}`}
                className="grayscale"
              />
              <AvatarFallback className="font-bold text-md">
                {session?.user?.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <h2 className="text-sm font-semibold">{session?.user.name}</h2>
              <span className="text-xs">{session?.user?.email}</span>
            </div>
            <FaChevronRight className="absolute right-2" />
          </Link>
          <Separator className="mt-1" />
          <MenubarGroup>
            <MenubarItem className="cursor-pointer">
              <Link href="/">
                <Button variant="ghost">
                  <GoHome /> Home
                </Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/about">
                <Button variant="ghost">
                  <FaRegUser /> About
                </Button>
              </Link>
            </MenubarItem>
          </MenubarGroup>
          <MenubarGroup>
            <MenubarItem className="cursor-pointer">
              <Link href="/articles">
                <Button variant="ghost">
                  <MdOutlineArticle /> Articles
                </Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/events">
                <Button variant="ghost">
                  <CiCalendarDate /> Events
                </Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/videos">
                <Button variant="ghost">
                  <FiPlayCircle /> Videos
                </Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/consulting">
                <Button className="cursor-pointer" variant="ghost">
                  <PiBagSimple />
                  Consulting
                </Button>
              </Link>
            </MenubarItem>
            <Separator />
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">
                <CiSun /> <span>Light mode</span>
              </MenubarRadioItem>

              <MenubarRadioItem value="dark">
                <FaMoon /> <span>Dark Mode</span>
              </MenubarRadioItem>
            </MenubarRadioGroup>

            <MenubarItem>
              <Link href={`/dashboard/${session?.user?.id}`}>Dashboard</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/booking" className="w-full">
                <Button className="bg-violet-800 w-full text-xs cursor-pointer hover:bg-violet-700 text-white font-semibold">
                  <FaRegCalendar className="text-white" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuList;
