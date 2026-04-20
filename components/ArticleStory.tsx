import { Article } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import { plateToHtml } from "@/lib/utils/plateToHtml";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaShareAlt } from "react-icons/fa";
import { Separator } from "./ui/separator";
import { calculateTime, slugify } from "@/lib/utils/helpers";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TiTick } from "react-icons/ti";
import { Button } from "./ui/button";
import { FaRegCopy, FaXTwitter } from "react-icons/fa6";

const ArticleStory = ({
  articleStory,
}: {
  articleStory: { article: [Article, User[]] };
}) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const articleUrl = `${process.env.NEXT_PUBLIC_API_URL}/${
    articleStory?.article[0]?.category
  }/${
    articleStory?.article[0]?.id
  }/${articleStory?.article[0]?.title?.replaceAll(" ", "-")}`;

  const encodedTitle = encodeURIComponent(articleStory?.article[0]?.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${articleUrl}&text=${encodedTitle}`,
  };

  // const { data: savedArticle, isLoading } = useSavedArticle(
  //   session?.user?.id as string,
  // );

  // const { mutate, data: toggleMark } = useToggleBookmark(
  //   session?.user?.id as string,
  // );

  // const isSaving =
  //   Array.isArray(toggleMark) &&
  //   toggleMark?.some((item) => item.ownerId === session?.user?.id);

  // const isSavedData =
  //   savedArticle?.some((item) => item.ownerId === session?.user?.id) ?? false;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy", err);
      setCopied(false);
    }
  };

  if (articleStory?.article[0]?.isDraft && !session?.user?.isAdmin) {
    return notFound();
  }

  return (
    <div className="lg:col-span-4 md:col-span-3 w-full col-span-6">
      <div className="">
        <h1 className="lg:text-4xl lg:font-semibold font-black tracking-wide md:text-xl text-lg my-2 capitalize">
          {articleStory?.article[0]?.title}
        </h1>
        <div className="flex items-center gap-1 mb-4 text-zinc-600 dark:text-zinc-300 text-xs font-semibold">
          <span className="  tracking-wider">
            {articleStory?.article[0]?.category?.toUpperCase()}
          </span>
          <Separator className="bg-gray-400 h-4! w-0.5!" />
          <span>{calculateTime(articleStory?.article[0]?.date)}</span>
        </div>
        <Image
          src={articleStory?.article[0]?.image || ""}
          alt={`${articleStory?.article[0]?.imageTitle}` || "image"}
          className="w-full h-80 md:h-100 lg:h-120 object-cover rounded-lg"
          width={250}
          height={250}
        />
        <h3 className="text-xs text-zinc-400 mt-2">
          {articleStory?.article[0]?.imageTitle}
        </h3>
      </div>
      <div className="flex justify-between pt-6">
        <div className="">
          {/* <h2>Image Source: {articleStory?.article[0]?.imageCredit}</h2>dsf3ret345W2343 */}

          <div className="flex items-center gap-2">
            <h2 className="">By: </h2>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale ">
              {articleStory?.article[1]?.map((user) => (
                <Avatar key={user?.id}>
                  <AvatarImage src={user?.image || "image"} alt="@shadcn" />
                  <AvatarFallback className="font-bold">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="flex gap-1">
              {articleStory?.article[1].length < 2 && (
                <Link
                  href={`/profile/${articleStory?.article[1][0]?.id}/${slugify(
                    articleStory?.article[1][0]?.name as string,
                  )}`}
                  className="flex items-center gap-2 whitespace-nowrap hover:underline"
                >
                  {articleStory?.article[1][0]?.name}
                </Link>
              )}
              {articleStory?.article[1].length > 1 && (
                <NavigationMenu>
                  <NavigationMenuList className="flex-wrap">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          +{articleStory?.article[1].length - 1} more{" "}
                          {articleStory?.article[1].length - 1 > 1
                            ? "people"
                            : "person"}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="">
                            {articleStory?.article[1]?.map((user) => (
                              <li className="row-span-3" key={user?.id}>
                                <NavigationMenuLink asChild className="">
                                  <Link
                                    href={`/profile/${slugify(
                                      user?.name as string,
                                    )}/${user?.id}`}
                                  >
                                    <div className="flex items-center gap-2 flex-nowrap px-2 py-2">
                                      <Avatar key={user?.id}>
                                        <AvatarImage
                                          src={user?.image || "image"}
                                          alt="@shadcn"
                                        />
                                        <AvatarFallback className="font-bold">
                                          {user?.name?.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="whitespace-nowrap">
                                        {user?.name}
                                      </span>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <span className="flex items-center gap-1 cursor-pointer">
                <span className="hover:underline">Share:</span> <FaShareAlt />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <div className="">
                {copied ? (
                  <div className="flex items-center gap-1">
                    <TiTick /> Copied Link
                  </div>
                ) : (
                  <Button variant="link" onClick={copyToClipboard}>
                    <FaRegCopy /> Copy Link
                  </Button>
                )}
              </div>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
              >
                <FaFacebookF /> Facebook
              </Link>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
              >
                <FaXTwitter /> Twitter
              </Link>
              <Link
                className="flex items-center gap-1"
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
              >
                <FaLinkedinIn /> LinkedIn
              </Link>
            </PopoverContent>
          </Popover>
          {/* {session?.user ? (
            <span
              onClick={() => mutate(articleStory?.article[0]?.id ?? 0)}
              className="flex items-center gap-1 cursor-pointer"
            >
              {isSavedData || isSaving ? "Saved:" : "Save:"}
              {isLoading ? (
                <Spinner />
              ) : isSavedData || isSaving ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </span>
          ) : (
            <span className="flex items-center gap-2 font-bold">
              <FaBookmark /> Login to save
            </span>
          )} */}
        </div>
      </div>
      <div className="prose mx-auto mt-4">
        {plateToHtml(
          JSON.parse(articleStory?.article[0]?.story),
          articleStory?.article[0]?.images,
          articleStory?.article[0]?.imagesTitle,
        )}
      </div>
    </div>
  );
};

export default ArticleStory;
