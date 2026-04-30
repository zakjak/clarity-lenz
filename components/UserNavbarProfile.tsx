"use client";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { slugify } from "@/lib/utils/helpers";
import { LuFilePenLine } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { BsGraphDown } from "react-icons/bs";

const UserNavbarProfile = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      redirect: false,
    });
    const isProfileRouter = pathname.startsWith("/profiles");

    if (!isProfileRouter) {
      router.push("/");
    }
  };

  return (
    <>
      {session ? (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session?.user?.image as string}
                alt={`Profile of ${session?.user?.name}`}
                className="grayscale"
              />
              <AvatarFallback className="font-bold text-md">
                {session?.user?.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3 mt-2 z-999">
            {session?.user?.isOwner && (
              <>
                <Link
                  href={`/profile/${session?.user?.id}/${slugify(session?.user?.name as string)}`}
                  className="flex items-center md:gap-2 gap-1 hover:bg-blue-300 w-full  p-2 rounded-md hover:text-white font-semibold tracking-wider"
                >
                  <CgProfile />
                  Profile
                </Link>
                {session?.user?.isOwner && session?.user?.isAdmin}
                <Link
                  href={`/dashboard/${session?.user?.id}`}
                  className="flex items-center md:gap-2 gap-1 hover:bg-blue-300 w-full  p-2 rounded-md hover:text-white font-semibold tracking-wider"
                >
                  <BsGraphDown />
                  Dashboard
                </Link>
                <Link
                  className="flex items-center md:gap-2 gap-1 bg-yellow-100 hover:bg-yellow-50 text-yellow-700 p-1 font-semibold rounded-sm py-2 px-1"
                  href={`/profile/${session?.user?.id}/draft`}
                >
                  <LuFilePenLine />
                  Draft
                </Link>
              </>
            )}

            <Link
              href={`/settings/${session?.user?.id}`}
              className="hover:bg-blue-300 w-full flex p-2 rounded-md hover:text-white font-semibold tracking-wider"
            >
              Settings
            </Link>
            <Button
              onClick={handleSignOut}
              className="w-full cursor-pointer font-bold"
              variant="destructive"
            >
              Sign Out
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      )}
    </>
  );
};

export default UserNavbarProfile;
