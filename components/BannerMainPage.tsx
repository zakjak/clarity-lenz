import Image from "next/image";
import { Pacifico, Roboto } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const BannerMainPage = () => {
  return (
    <div className="w-full lg:h-130 h-100 relative">
      <Image
        src="/images/cover-image-4.jpg"
        fill
        alt="Banner image, lady on a laptop"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-35 lg:bottom-50 text-zinc-700 left-10">
        <h1 className="text-4xl md:text-4xl lg:text-5xl whitespace-nowrap">
          <span className={roboto.className}>Welcome to</span>{" "}
          <span
            className={`${pacifico.className} bg-gradient-to-r from-[#051F31] via-[#085A6E] to-indigo-400 bg-clip-text text-transparent`}
          >
            Clarity Lenz
          </span>
        </h1>
        <div className="mt-4">
          <h3 className="text-lg">Latest articles, tips, and online events</h3>
          <Link href="/articles">
            <Button variant="secondary" className="cursor-pointer mt-4">
              Browse Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerMainPage;
