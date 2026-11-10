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
    <Card className="relative rounded-sm">
      <Link
        href={`${process.env.API_URL}/${slugify(article?.category)}/${article?.id}/${
          article && article?.title?.replaceAll(" ", "-")
        }`}
      >
        <Image
          src={article?.image}
          width={200}
          height={200}
          alt={`${article?.title}`}
          className="w-full h-40 object-cover"
        />
        <CardHeader className="py-2">
          <CardTitle className="md:w-[70%] line-clamp-2">
            {article?.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 md:w-[80%]">
            {article && plateToHtml(JSON.parse(article?.story))}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4">
          <div className="flex items-center text-[.6rem] gap-1 text-zinc-300">
            <HiMiniCalendar size={15} />
            <span>{calculateTime(article?.date)}</span>
          </div>
        </CardFooter>
        <Badge className="absolute top-1 left-1 text-[.6rem] bg-violet-800 text-zinc-100">
          {article?.category}
        </Badge>
      </Link>
    </Card>
  );
};

export default LatestArticleComponent;
