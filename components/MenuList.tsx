import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useTheme } from "next-themes";

const MenuList = () => {
  const { setTheme } = useTheme();
  return (
    <Menubar className="block md:hidden">
      <MenubarMenu>
        <MenubarTrigger>
          <IoMenuOutline />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem className="cursor-pointer">
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </MenubarItem>
          </MenubarGroup>
          <MenubarGroup>
            <MenubarItem className="cursor-pointer">
              <Link href="/articles">
                <Button variant="ghost">Articles</Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/events">
                <Button variant="ghost">Articles</Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/videos">
                <Button variant="ghost">Videos</Button>
              </Link>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              <Link href="/consulting">
                <Button className="cursor-pointer" variant="ghost">
                  Consulting
                </Button>
              </Link>
            </MenubarItem>
            <HoverCard>
              <Button variant="ghost" className="w-full flex justify-start">
                <HoverCardTrigger>Dark Mode</HoverCardTrigger>
              </Button>
              <HoverCardContent className="flex flex-col gap-2">
                <Button onClick={() => setTheme("light")}>
                  <span>Light mode</span>
                </Button>
                <Button onClick={() => setTheme("dark")}>
                  <span>Dark Mode</span>
                </Button>
              </HoverCardContent>
            </HoverCard>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuList;
