"use client";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EventsForm from "./EventsForm";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/users";

const AddEventComponent = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-red w-full justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add event</Button>
        </DialogTrigger>
        <EventsForm user={session?.user as User} setOpen={setOpen} />
      </Dialog>
    </div>
  );
};

export default AddEventComponent;
