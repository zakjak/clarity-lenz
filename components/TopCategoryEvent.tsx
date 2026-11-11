"use client";
import { EventProp } from "@/lib/types/users";
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
import { Badge } from "./ui/badge";
import { useDeleteEvent } from "@/hooks/useEvents";
import { formattedTime } from "@/lib/utils/helpers";
import { authClient } from "@/lib/auth-client";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { LuClock } from "react-icons/lu";

const TopCategoryEvent = ({ event }: { event: EventProp }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const { data: session } = authClient.useSession();

  const { mutate } = useDeleteEvent();

  const start = moment(event?.eventStart);
  const end = moment(event?.eventEnd);
  const duration = moment.duration(end.diff(start));
  const formatted = `${duration.hours()}h: ${duration.minutes()}m`;

  const isAdminOwner = session?.user?.isAdmin && session?.user?.isOwner;

  const isAuthor = event?.ownerId === session?.user?.id;
  const canDelete = isAdminOwner || isAuthor;

  return (
    <>
      <Card className="mt-2 rounded-2xl overflow-hidden dark:bg-zinc-950">
        <Link href={`${process.env.API_URL}/events/${event?.id}`}>
          <div className="relative w-full h-50">
            <Image
              src={event?.image ?? ""}
              alt={`${event?.title}`}
              className=" w-full h-56 object-cover object-center"
              fill
            />
            <Badge className="text-[.6rem] bg-blue-500 text-white font-semibold absolute top-3 left-3">
              {event?.platform}
            </Badge>

            <div>
              {canDelete && (
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
            <Link href={`${process.env.API_URL}/events/${event?.id}`}>
              <h2 className="text-[15px] font-bold line-clamp-2 hover:underline mb-2">
                {event?.title}
              </h2>
            </Link>
            <Separator />
            <div className="line-clamp-2 text-xs my-2">
              <p>{event?.description}</p>
            </div>

            <div className=" text-xs text-zinc-600 dark:text-zinc-300 mt-2">
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MdOutlineCalendarMonth size={20} />
                  <span>
                    {moment(event?.eventStart).format("MMM DD, YYYY")}
                  </span>
                </div>

                <div className="text-xs flex items-center gap-2">
                  <GiDuration size={20} /> <span>{formatted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[.7rem] flex gap-2">
                    <LuClock />{" "}
                    <span className="">
                      {moment(event?.eventStart)
                        .format("hh:mm a")
                        .toUpperCase()}{" "}
                      -{" "}
                      {moment(event?.eventEnd).format("hh:mm a").toUpperCase()}
                    </span>
                    <span className="font-bold"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </>
  );
};

export default TopCategoryEvent;
