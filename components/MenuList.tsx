import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Moon, Sun } from "lucide-react";
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

              <HoverCardContent>
                <Button onClick={() => setTheme("light")}>
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                </Button>
                <Button onClick={() => setTheme("dark")}>
                  <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
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
