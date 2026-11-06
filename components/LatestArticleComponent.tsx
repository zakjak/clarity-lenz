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

const LatestArticleComponent = ({ articles }: { articles: Article[] }) => {
  console.log(articles[0]);
  return (
    <Card className="relative rounded-sm">
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/${slugify(articles[0]?.category)}/${articles[0]?.id}/${
          articles && articles[0]?.title?.replaceAll(" ", "-")
        }`}
      >
        <Image
          src={articles[0]?.image}
          width={200}
          height={200}
          alt={`${articles[0]?.title}`}
          className="w-full h-40 rounded-xl object-cover"
        />
        <CardHeader className="py-2">
          <CardTitle className="md:w-[70%] line-clamp-2">
            {articles[0]?.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 md:w-[80%]">
            {plateToHtml(JSON.parse(articles[0]?.story))}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4">
          <div className="flex items-center text-[.6rem] gap-1 text-zinc-300">
            <HiMiniCalendar size={15} />
            <span>{calculateTime(articles[0]?.date)}</span>
          </div>
        </CardFooter>
        <Badge className="absolute top-1 left-1 text-[.6rem] bg-violet-800 text-zinc-100">
          {articles[0]?.category}
        </Badge>
      </Link>
    </Card>
  );
};

export default LatestArticleComponent;
