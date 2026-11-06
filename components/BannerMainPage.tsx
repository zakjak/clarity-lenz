import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FaArrowRight } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";

const BannerMainPage = () => {
  return (
    <div className="w-full lg:h-200 h-100 relative">
      <Image
        src="/images/ceo.jpeg"
        fill
        alt="Banner image, lady on a laptop"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute bottom-16 md:bottom-30 lg:bottom-60 text-white left-10">
        <Badge className="bg-violet-300 text-violet-900 text-[.6em] font-black">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-700" />
          Our Blog
        </Badge>
        <div className="mt-2 md:mt-4 flex flex-col gap-2">
          <h2 className="text-6xl w-[70%]">
            Insights. Ideas.{" "}
            <span className="text  bg-linear-to-r from-[#D55114] via-[#FE8919] to-[#FEBE1A] bg-clip-text text-transparent">
              Innovation.
            </span>
          </h2>
          <p className="text-sm text-zinc-100 w-[70%]">
            Stay updated with the latest news, tech insights and events from{" "}
            <span className="font-black">Clarity Lenz</span>
          </p>
          <div className="flex gap-2">
            <Link href="/articles">
              <Button
                variant="secondary"
                className="cursor-pointer mt-4 rounded-full"
              >
                Explore Articles <FaArrowRight />
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                className="cursor-pointer mt-4 rounded-full text-black dark:text-white"
              >
                <FiCalendar /> Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerMainPage;
