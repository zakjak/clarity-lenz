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

const MenuList = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <IoMenuOutline />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <Link href="/">Home</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/about">About</Link>
            </MenubarItem>
          </MenubarGroup>
          <MenubarGroup>
            <MenubarItem>
              <Link href="/articles">Articles</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/events">Events</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/videos">videos</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/consulting">consulting</Link>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuList;
