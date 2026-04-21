"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import VideoDialog from "./VideoDialog";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/users";

const CreateVideo = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Create Video</Button>
        </DialogTrigger>
        <VideoDialog user={session?.user as User} setOpen={setOpen} />
      </Dialog>
    </div>
  );
};

export default CreateVideo;
