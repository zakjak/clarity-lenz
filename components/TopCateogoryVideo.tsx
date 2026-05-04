"use client";
import { Video } from "@/lib/types/video";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { calculateTime, formatted } from "@/lib/utils/helpers";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegClock } from "react-icons/fa6";
import { useDeleteVideo } from "@/hooks/useVideos";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useSession } from "next-auth/react";

const TopCateogoryVideo = ({ video }: { video: Video }) => {
  const { data: session } = useSession();
  const videoId = new URL(video?.videoUrl).searchParams.get("v");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const { mutate } = useDeleteVideo();

  const isAdminOwner = session?.user?.isAdmin && session?.user?.isOwner;

  const isAuthor = video?.ownerId === session?.user?.id;
  const canDelete = isAdminOwner || isAuthor;

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="border ">
            <Image
              src={thumbnail}
              alt={`${video.title}`}
              width={640}
              height={640}
              className="cursor-pointer"
            />
            <div className="mt-2 flex flex-col gap-2 p-2">
              <h3 className="font-semibold line-clamp-2 hover:underline cursor-pointer">
                {video?.title}
              </h3>
              <p className="line-clamp-2 text-xs text-zinc-600 w-[90%]">
                {formatted(video?.description)}
              </p>
              <span className="text-xs flex text-zinc-600 items-center gap-2">
                <FaRegClock />
                {calculateTime(video?.date)}
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-full h-180 overflow-scroll">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-160"
          />
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold mt-1 line-clamp-2 hover:underline cursor-pointer">
              {video?.title}{" "}
              {video?.platform && <span>({video?.platform})</span>}
            </h3>
            {video?.description && (
              <p className="bg-zinc-200 p-5 rounded-2xl dark:bg-zinc-900 mt-8">
                {formatted(video?.description)}
              </p>
            )}
            <div className="flex gap-2">
              <Button className="cursor-pointer">
                <Link href={video?.videoUrl} target="_blank">
                  Watch on Youtube
                </Link>
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {canDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="absolute top-4 right-4 cursor-pointer font-semibold"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                video from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => mutate(video?.id as number)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default TopCateogoryVideo;
