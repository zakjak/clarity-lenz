import { Video } from "@/lib/types/video";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { formatted } from "@/lib/utils/helpers";
import Link from "next/link";
import { Button } from "./ui/button";

const TopCateogoryVideo = ({ video }: { video: Video }) => {
  const videoId = new URL(video?.videoUrl).searchParams.get("v");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  console.log(video);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">
          <Image
            src={thumbnail}
            alt={`${video.title}`}
            width={640}
            height={640}
            className="cursor-pointer"
          />
          <div className="mt-2">
            <h3 className="text-xs font-semibold line-clamp-2 hover:underline cursor-pointer">
              {video?.title}
            </h3>
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
            {video?.title} {video?.platform && <span>({video?.platform})</span>}
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
  );
};

export default TopCateogoryVideo;
