"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import { calculateTime, slugify } from "@/lib/utils/helpers";
import { Article } from "@/lib/types/article";

import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { TbEdit } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/users";
import { Dialog } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Badge } from "./ui/badge";
import { useDeleteArticle } from "@/hooks/useArticle";
import ArticleDialog from "./ArticleDialog";
const TopCategoryStory = ({ topStory }: { topStory: Article }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const { mutate } = useDeleteArticle();
  const pathname = usePathname();

  const handleEdit = () => {
    setOpen(true);
  };

  const isAdminOwner = session?.user?.isAdmin && session?.user?.isOwner;

  const isAuthor = topStory?.authors?.includes(session?.user?.id as string);
  const canDelete = isAdminOwner || isAuthor;

  return (
    <>
      <Card className="mt-2">
        <div className="relative">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/${slugify(topStory?.category)}/${topStory?.id}/${
              topStory && topStory?.title?.replaceAll(" ", "-")
            }`}
          >
            <div className="w-full md:h-40 h-60 relative">
              <Image
                src={topStory?.image}
                fill
                alt={`${topStory?.title}`}
                className=" w-full h-56 object-cover absolute"
              />
            </div>
          </Link>
          <div>
            {canDelete && (
              <>
                <div className="flex flex-col gap-2 absolute top-3 right-3">
                  {/* {topStory?.authors?.includes(
                      session?.user?.id as string,
                    ) && ( */}
                  <Button
                    variant="destructive"
                    onClick={() => setOpenDelete(true)}
                    className="rounded-full cursor-pointer hover:bg-red-600 font-semibold"
                  >
                    <AiOutlineDelete />
                    Delete
                  </Button>
                  {/* )} */}

                  <Dialog
                    open={open}
                    onOpenChange={(open) => {
                      setOpen(open);
                    }}
                  >
                    {topStory?.authors?.includes(
                      session?.user?.id as string,
                    ) && (
                      <DialogTrigger asChild>
                        <Button onClick={handleEdit} className="cursor-pointer">
                          <TbEdit />
                          Edit
                        </Button>
                      </DialogTrigger>
                    )}

                    <ArticleDialog
                      user={session?.user as User}
                      openEdit={open}
                      articleId={topStory?.id as number}
                      setOpenEdit={setOpen}
                    />
                  </Dialog>
                </div>
                {topStory?.isDraft && (
                  <Badge
                    className="absolute top-3 left-3 font-bold text-lg"
                    variant="destructive"
                  >
                    Draft
                  </Badge>
                )}
              </>
            )}
          </div>
          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure, you want to delete
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your article and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate(topStory?.id as number)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-col gap-3 text-xs my-4 mx-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[0.6rem] tracking-widest dark:bg-[#192649] dark:text-[#C9B4F7] dark:px-2 dark:py-1 dark:rounded-full bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full">
              {topStory?.category?.toUpperCase()}
            </span>
            {/* <Separator className="h-1! w-1! bg-gray-400 rounded-full!" /> */}
            <span className="font-semibold text-zinc-400">
              {calculateTime(topStory?.date)}
            </span>
          </div>

          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/${topStory?.category}/${
              topStory?.id
            }/${topStory?.title?.replaceAll(" ", "-")}`}
          >
            <h2 className="text-sm line-clamp-2 hover:underline font-semibold">
              {topStory?.title}
            </h2>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default TopCategoryStory;
