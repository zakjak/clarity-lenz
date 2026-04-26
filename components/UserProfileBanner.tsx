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
import { FaEnvelope } from "react-icons/fa6";

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
          <div className="flex flex-col md:flex md:flex-row gap-4 mx-auto mt-6 p-10 items-center md:items-start rounded-xl overflow-hidden shadow">
            {data?.user[0]?.image ? (
              <div className="relative md:rounded-lg w-35 h-35 md:h-30 md:w-50 lg:w-70 lg:h-60">
                <Image
                  src={data?.user[0].image}
                  alt={`Profile of ${data?.user[0].name}`}
                  fill
                  className="rounded-full border-3 border-white shadow-xl object-cover"
                />
              </div>
            ) : (
              <div className="">
                <p>{data?.user[0]?.name?.slice(0, 1)}</p>
              </div>
            )}
            <div className="grow md:flex md:justify-between text-center md:text-left gap-4">
              <div className="w-full">
                <h2 className="text-2xl lg:text-4xl font-semibold">
                  {data?.user[0]?.name}
                </h2>
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
                  <Button variant="ghost" className="cursor-pointer">
                    <Link href={`mailto:${session?.user?.email}`}>
                      <FaEnvelope />
                    </Link>
                  </Button>
                </div>
              </div>
              {session?.user?.id === data?.user[0]?.id && (
                <div className="flex items-center justify-center">
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
