"use client";

import { useSession } from "next-auth/react";
import ArticleDialog from "./ArticleDialog";
import { User } from "@/lib/types/users";
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

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
          <Button className="cursor-pointer">Create Article</Button>
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
