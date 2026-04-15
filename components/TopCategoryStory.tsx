"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { calculateTime } from "@/lib/utils/helpers";
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
  const [openEdit, setOpenEdit] = useState(false);
  const { data: session } = useSession();

  const { mutate } = useDeleteArticle();
  const pathname = usePathname();
  const isProfile = pathname.includes("/profile");

  const handleEdit = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <Card className="mt-2 rounded-2xl! overflow-hidden">
        <div className="relative">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/${topStory?.category}/${topStory?.id}/${
              topStory && topStory?.title?.replaceAll(" ", "-")
            }`}
          >
            <Image
              src={topStory?.image}
              width={240}
              height={240}
              alt={`${topStory?.title}`}
              className=" w-full h-56 object-cover"
            />
          </Link>
          <div>
            {isProfile && (
              <>
                <div className="flex flex-col gap-2 absolute top-3 right-3">
                  <Button
                    variant="destructive"
                    onClick={() => setOpenDelete(true)}
                    className="rounded-full cursor-pointer hover:bg-red-600 font-semibold"
                  >
                    <AiOutlineDelete />
                    Delete
                  </Button>
                  <Dialog
                    open={openEdit}
                    onOpenChange={(open) => {
                      setOpenEdit(open);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={handleEdit} className="cursor-pointer">
                        <TbEdit />
                        Edit
                      </Button>
                    </DialogTrigger>

                    <ArticleDialog
                      user={session?.user as User}
                      openEdit={openEdit}
                      articleId={topStory?.id as number}
                      setOpenEdit={setOpenEdit}
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
        <div className="my-4 mx-2">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/${topStory?.category}/${
              topStory?.id
            }/${topStory?.title?.replaceAll(" ", "-")}`}
          >
            <h2 className="text-[15px] line-clamp-2 hover:underline">
              {topStory?.title}
            </h2>
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
            <span className="font-bold text-xs tracking-wider">
              {topStory?.category?.toUpperCase()}
            </span>
            <Separator className="h-4! w-0.5! bg-gray-400" />
            <span className="font-bold">{calculateTime(topStory?.date)}</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TopCategoryStory;
