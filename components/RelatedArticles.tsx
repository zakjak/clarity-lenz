import { Article } from "@/lib/types/article";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Clock } from "lucide-react";
import { calculateTime } from "@/lib/utils/helpers";

const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="md:col-span-2 col-span-6 md:pt-5 md:border-0 mt-8 m-6">
      {articles?.length >= 1 && (
        <h2 className="font-bold leading-2 tracking-wide lg:text-2xl lg:font-semibold md:text-xl text-xl mb-2 whitespace-nowrap">
          Top Related Articles
        </h2>
      )}

      <div className="">
        {articles?.map((article) => (
          <Card key={article.id} className="mt-6">
            <div className="relative w-full h-80 md:h-60">
              <Link
                href={`/${article.category}/${
                  article.id
                }/${article.title.replaceAll(" ", "-")}`}
                className="w-full"
              >
                <Image
                  src={article.image}
                  alt={`${article.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover rounded-md absolute"
                />
              </Link>
            </div>
            <div className="p-2">
              <Link
                href={`/${article.category}/${
                  article.id
                }/${article.title.replaceAll(" ", "-")}`}
              >
                <h2 className="line-clamp-2 text-xs font-semibold">
                  {article.title}
                </h2>
              </Link>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
                <span className="font-semibold tracking-wider whitespace-nowrap">
                  {article?.category?.toUpperCase()}
                </span>
                <Separator className="w-0.5! h-3! bg-gray-500" />
                <span className="flex gap-1 items-center whitespace-nowrap">
                  <Clock width={13} />
                  {calculateTime(article?.date)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
