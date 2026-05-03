"use client";

import { useSearch } from "@/hooks/useSearch";
import { Article } from "@/lib/types/article";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Image from "next/image";
import { calculateTime } from "@/lib/utils/helpers";
import PaginationComponent from "./PaginationComponent";

const AllSearch = ({ page, q }: { page: string; q: string }) => {
  const [] = useState(1);
  const pageNumber = Number(page) || 1;

  const { data } = useSearch(q, pageNumber);

  const articles: Article[] = data?.search;

  const totalArticles = (page: number) => {
    if (page * 10 < data?.countRows[0]?.count) {
      if (page <= 1) {
        return `Displaying ${page}-${page * 10} results out of ${" "}
                ${data?.countRows[0]?.count} for ${q?.replaceAll("+", " ")}`;
      } else {
        return `Displaying ${(page - 1) * 10 + 1}-${
          data?.countRows[0]?.count
        } results out of ${" "}
                ${data?.countRows[0]?.count} for ${q?.replaceAll("+", " ")}`;
      }
    } else {
      return `Displaying ${(page - 1) * 10 + 1}-${
        data?.countRows[0]?.count
      } results out of ${" "}
        ${data?.countRows[0]?.count} for ${q?.replaceAll("+", " ")}`;
    }
  };

  return (
    <div className="p-8 mx-auto lg:w-[60%] md:w-[80%]">
      <div className="">
        <h2 className="text-lg font-bold">{totalArticles(pageNumber)}</h2>
      </div>
      {articles && (
        <div className="w-[90%]">
          {articles?.map((article) => (
            <div key={article?.id} className="border-b pb-6 pt-4">
              <div className="mt-2 grid grid-cols-3 gap-2 h-30 items-center">
                <Link
                  href={`/${article?.category}/${article?.id}/${
                    article && article?.title?.replaceAll(" ", "-")
                  }`}
                  className="h-full col-span-1"
                >
                  {/* md:h-40 md:w-60 w-40 h-32 */}
                  <div className="w-full h-full relative">
                    <Image
                      src={article?.image}
                      fill
                      alt={`${article?.title}`}
                      className="w-full h-full object-cover absolute"
                    />
                  </div>
                </Link>
                <div className="leading-8 max-w-[90%] col-span-2">
                  <Link
                    href={`/${article?.category}/${
                      article?.id
                    }/${article?.title?.replaceAll(" ", "-")}`}
                  >
                    <h2 className="md:text-md text-sm hover:underline line-clamp-2 md:line-clamp-3">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="text-xs text-gray-400 mt-2">
                    <span className="text-black md:line-clamp-2 my-2 lg:line-clamp-3 dark:text-zinc-400 text-[.79rem] hidden">
                      {JSON.parse(article.story)[0]?.children[0]?.text +
                        " " +
                        JSON.parse(article.story)[1]?.children[0]?.text +
                        JSON.parse(article.story)[2]?.children[0]?.text}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{article?.category}</span>
                      <Separator className="h-4 w-0.5 bg-gray-400" />
                      <span>{calculateTime(article?.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-8">
            {data?.pageNumber > 1 && (
              <PaginationComponent pageNumber={data?.pageNumber} query={q} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSearch;
