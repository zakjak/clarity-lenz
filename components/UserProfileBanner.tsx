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
          <div className="flex flex-col md:flex md:flex-row gap-4 mx-auto mt-6 justify-center items-center relative p-10 rounded-xl overflow-hidden shadow">
            <Image
              src="/images/profile-banner.png"
              fill
              className="absolute -z-10 object-cover"
              alt="profile banner background"
            />
            {data?.user[0]?.image ? (
              <Image
                src={data?.user[0].image}
                alt={`Profile of ${data?.user[0].name}`}
                width={240}
                height={240}
                className="rounded-full border-3 border-white shadow-xl md:rounded-lg w-35 h-35 md:w-50 md:h-50 lg:w-60 lg:h-60"
              />
            ) : (
              <div className="">
                <p>{data?.user[0]?.name?.slice(0, 1)}</p>
              </div>
            )}
            <div className="grow md:flex md:justify-between text-center md:text-left">
              <div className="w-full">
                <h2 className="text-lg font-semibold">{data?.user[0]?.name}</h2>
                <h3 className="text-center md:text-left text-xsfont-semibold">
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
                <div className="my-2">
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
                <div className="flex items-center text-blue-800 justify-center">
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
