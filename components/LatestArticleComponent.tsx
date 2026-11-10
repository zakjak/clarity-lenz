import { Article } from "@/lib/types/article";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HiMiniCalendar } from "react-icons/hi2";
import { calculateTime, slugify } from "@/lib/utils/helpers";
import { Badge } from "./ui/badge";
import { plateToHtml } from "@/lib/utils/plateToHtml";
import Link from "next/link";

const LatestArticleComponent = ({ article }: { article: Article }) => {
  return (
    <Card className="rounded-sm w-full relative">
      <Link
        href={`${process.env.API_URL}/${slugify(article?.category)}/${article?.id}/${
          article && article?.title?.replaceAll(" ", "-")
        }`}
      >
        <div className="relative w-full h-40">
          <Image
            src={article?.image}
            alt={`${article?.title}`}
            className="w-full h-[50%] object-cover rounded-sm object-center opacity-90 hover:opacity-95 transition-opacity"
            fill
          />
        </div>

        <CardHeader className="pt-2">
          <CardTitle className=" line-clamp-2 font-black text-sm">
            {article?.title
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </CardTitle>
          <CardDescription className="line-clamp-2 md:w-[90%] -mt-2">
            {article && plateToHtml(JSON.parse(article?.story))}
          </CardDescription>
        </CardHeader>
        <CardFooter className="py-2">
          <div className="flex items-center text-[.6rem] gap-1 text-zinc-600">
            <HiMiniCalendar size={15} />
            <span>{calculateTime(article?.date)}</span>
          </div>
        </CardFooter>
        <Badge className="top-1 left-1 text-[.6rem] bg-violet-800 text-zinc-100 absolute">
          {article?.category}
        </Badge>
      </Link>
    </Card>
  );
};

export default LatestArticleComponent;
