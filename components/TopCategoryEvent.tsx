import { EventProp } from "@/lib/types/users";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Card, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { AiOutlineDelete } from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Separator } from "./ui/separator";
import moment from "moment";
import { IoCalendarOutline } from "react-icons/io5";
import { TiTicket } from "react-icons/ti";
import { useDeleteEvent } from "@/hooks/useEvents";

const TopCategoryEvent = ({ event }: { event: EventProp }) => {
  const [openDelete, setOpenDelete] = useState(false);

  const { mutate } = useDeleteEvent();
  const pathname = usePathname();
  const isProfile = pathname.includes("/events");

  const start = moment(event?.eventStart);
  const end = moment(event?.eventEnd);
  const duration = moment.duration(end.diff(start));
  const formatted = `${duration.hours()}h ${duration.minutes()}m`;

  return (
    <>
      <Card className="mt-2 rounded-2xl overflow-hidden">
        <div className="relative">
          <Link href={`/events/${event?.id}`}>
            <Image
              src={event?.image ?? ""}
              width={240}
              height={240}
              alt={`${event?.title}`}
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
                </div>
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
                  className="cursor-pointer"
                  onClick={() => mutate(event?.id as number)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="p-5 mx-2">
          <Link href={`/events/${event?.id}`}>
            <h2 className="text-[15px] line-clamp-2 hover:underline mb-2">
              {event?.title}
            </h2>
          </Link>
          <Separator />
          <div className=" text-xs text-zinc-400 mt-2">
            <span className="font-bold flex gap-2 items-center">
              <IoCalendarOutline size={19} />{" "}
              {moment(event?.eventEnd).format("YYYY-MM-DD")}
            </span>
            <div className="mt-4 flex flex-col gap-2">
              <span className="font-bold">Duration: {formatted}</span>
              <div className="flex gap-2">
                <span className="font-bold">
                  Starts at: {moment(event?.eventStart).format("h:mm")}
                </span>
                <span className="font-bold">
                  Ends at: {moment(event?.eventEnd).format("h:mm")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardFooter className="flex-col gap-2 w-full my-4">
          <Link href={`/events/${event?.id}`} className="w-full">
            <Button type="button" className="w-full cursor-pointer">
              <TiTicket /> View Event
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default TopCategoryEvent;
