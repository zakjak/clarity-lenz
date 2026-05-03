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
    <div className="w-full lg:h-200 h-100 relative">
      <Image
        src="/images/ceo.jpeg"
        fill
        alt="Banner image, lady on a laptop"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute bottom-16 md:bottom-30 lg:bottom-60 text-white left-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
          <span className={roboto.className}>Welcome to</span>{" "}
          <span
            className={`${pacifico.className} bg-linear-to-r from-[#D55114] via-[#FE8919] to-[#FEBE1A] bg-clip-text text-transparent`}
          >
            Clarity Lenz
          </span>
        </h1>
        <div className="mt-2 md:mt-4 flex flex-col gap-2">
          <p className="text-xs text-zinc-100 w-[80%]">
            In-depth articles, powerful stories and meaningful conversations on
            the issues shaping our world
          </p>
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
