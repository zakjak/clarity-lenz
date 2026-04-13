"use client";
import { useAuthor } from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import EditProfileComponent from "./EditProfileComponent";
import { formatted } from "@/lib/utils/helpers";
import { Button } from "./ui/button";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import UserInfoBanner from "./UserInfoBanner";

const UserProfileBanner = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const { data } = useAuthor(id as string);

  const socials = [
    {
      id: 1,
      link: data?.aboutUser[0]?.fb,
      icon: <FaFacebook />,
    },
    {
      id: 2,
      link: data?.aboutUser[0]?.instagram,
      icon: <FaInstagram />,
    },
    {
      id: 3,
      link: data?.aboutUser[0]?.linkedIn,
      icon: <FaLinkedin />,
    },
    {
      id: 4,
      link: data?.aboutUser[0]?.twitter,
      icon: <FaXTwitter />,
    },
  ];

  return (
    <div className="w-full">
      {data?.user?.length > 0 && (
        <div className="">
          <div className="flex flex-col md:flex md:flex-row gap-4 w-[90%] mx-auto mt-6 justify-center items-center">
            {data?.user[0]?.image ? (
              <Image
                src={data?.user[0].image}
                alt={`Profile of ${data?.user[0].name}`}
                width={240}
                height={240}
                className="rounded-full md:rounded-lg w-35 h-35 md:w-50 md:h-50 lg:w-60 lg:h-60"
              />
            ) : (
              <div className="">
                <p>{data?.user[0]?.name?.slice(0, 1)}</p>
              </div>
            )}

            <div className="grow flex justify-between">
              <div className="w-full">
                <h2 className="text-lg md:text-2xl lg:text-3xl text-center md:text-left">
                  {data?.user[0]?.name}
                </h2>
                <h3 className="text-center md:text-left">
                  {data?.aboutUser[0]?.position}
                </h3>
                <Separator className="w-full my-2" />
                <div className="">
                  <div className="line-clamp-3">
                    {formatted(data?.aboutUser[0]?.bio)[0]}
                  </div>
                  {formatted(data?.aboutUser[0]?.bio)?.length > 1 && (
                    <UserInfoBanner
                      user={data?.user[0]}
                      userInfo={data?.aboutUser[0]}
                    />
                  )}
                </div>
                <div className="mt-5">
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
              </div>
              {session?.user?.id === data?.user[0]?.id && (
                <div className="">
                  <EditProfileComponent
                    userId={session?.user?.id as string}
                    userInfo={data?.aboutUser[0]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileBanner;
