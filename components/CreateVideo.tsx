"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import VideoDialog from "./VideoDialog";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/users";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { Button } from "./ui/button";
import { FaChevronRight } from "react-icons/fa";

const CreateVideo = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer w-full flex justify-start p-10 "
            variant="outline"
          >
            <span className="bg-blue-950 p-4 rounded-lg">
              <MdOutlineSmartDisplay className="text-white " />
            </span>
            <div className="flex flex-col text-justify items-start">
              <span className="font-extrabold text-lg"> Create Video</span>
              <span className="text-xs text-zinc-500 font-semibold whitespace-normal">
                Upload and share your videos
              </span>
            </div>
            <FaChevronRight className="text-zinc-500" />
          </Button>
        </DialogTrigger>
        <VideoDialog user={session?.user as User} setOpen={setOpen} />
      </Dialog>
    </div>
  );
};

export default CreateVideo;
