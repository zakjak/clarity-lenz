"use client";

import { useSession } from "next-auth/react";
import ArticleDialog from "./ArticleDialog";
import { User } from "@/lib/types/users";
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaRegFileAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const CreateArticle = ({
  setOpen,
  open,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="w-full flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer w-full flex jus p-10"
            variant="outline"
          >
            <span className="bg-blue-950 p-4 rounded-lg text-4xl">
              <FaRegFileAlt className="text-white" size={100} />
            </span>
            <div className="flex flex-col text-justify items-start">
              <span className="font-extrabold text-lg"> Create Article</span>
              <span className="text-xs text-zinc-500 font-semibold whitespace-normal">
                Share your thoughts and insights
              </span>
            </div>
            <FaChevronRight className="text-zinc-500" />
          </Button>
        </DialogTrigger>
        <ArticleDialog
          user={session?.user as User}
          setOpenEdit={setOpenEdit}
          openEdit={openEdit}
        />
      </Dialog>
    </div>
  );
};

export default CreateArticle;
