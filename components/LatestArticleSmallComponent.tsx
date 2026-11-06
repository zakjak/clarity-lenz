import { Article } from "@/lib/types/article";
import { Card, CardTitle } from "./ui/card";
import Image from "next/image";
import { HiMiniCalendar } from "react-icons/hi2";
import { calculateTime, slugify } from "@/lib/utils/helpers";
import Link from "next/link";

const LatestArticleSmallComponent = ({ article }: { article: Article }) => {
  return (
    <Card className="p-1">
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/${slugify(article?.category)}/${article?.id}/${
          article && article?.title?.replaceAll(" ", "-")
        }`}
        className="flex items-center gap-2"
      >
        <Image
          src={article?.image}
          width={200}
          height={200}
          alt={`${article?.imagesTitle}`}
          className="rounded-2xl w-[20rem] h-20 object-cover p-1"
        />
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm line-clamp-2">
            {article?.title}
          </CardTitle>
          <span className="text-[.6rem] flex items-center gap-1">
            <HiMiniCalendar />
            {calculateTime(article?.date)}
          </span>
        </div>
      </Link>
    </Card>
  );
};

export default LatestArticleSmallComponent;
