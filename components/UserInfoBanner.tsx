import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User, UserInfo } from "@/lib/types/users";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { formatted } from "@/lib/utils/helpers";

const UserInfoBanner = ({
  user,
  userInfo,
}: {
  user: User;
  userInfo: UserInfo;
}) => {
  const socials = [
    {
      id: 1,
      link: userInfo?.fb,
      icon: <FaFacebook />,
    },
    {
      id: 2,
      link: userInfo?.instagram,
      icon: <FaInstagram />,
    },
    {
      id: 3,
      link: userInfo?.linkedIn,
      icon: <FaLinkedin />,
    },
    {
      id: 4,
      link: userInfo?.twitter,
      icon: <FaXTwitter />,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="cursor-pointer">
          Read More...
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <Image
            src={user.image as string}
            alt={`Profile of ${user.name}`}
            width={240}
            height={240}
            className="rounded-full w-24 h-24"
          />
          <DialogTitle>{user?.name}</DialogTitle>
          <DialogDescription>{userInfo?.position}</DialogDescription>
          <div className="">
            {socials?.map(
              (social) =>
                social?.link && (
                  <Button
                    variant="ghost"
                    key={social?.id}
                    className="cursor-pointer"
                  >
                    <Link href={social?.link}>{social?.icon}</Link>
                  </Button>
                ),
            )}
          </div>
          <Separator />
        </DialogHeader>
        <DialogDescription>
          {formatted(userInfo?.bio)?.map((text, idx) => (
            <p key={idx} className="mb-4">
              {text}
            </p>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoBanner;
