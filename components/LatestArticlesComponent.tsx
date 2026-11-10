import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import LatestArticles from "./LatestArticles";
import { FaArrowRight } from "react-icons/fa6";

const LatestArticlesComponent = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center relative">
          <h2 className="font-semibold text-2xl pl-4">Latest Articles</h2>
          <div className="w-1 h-full bg-[#5a20e0] absolute left-0 top-0" />
        </div>

        <Link href="/articles">
          <Button
            variant="link"
            className="cursor-pointer text-[#632CE5] dark:text-white text-xs"
          >
            Explore More
            <FaArrowRight />
          </Button>
        </Link>
      </div>

      <LatestArticles />
    </div>
  );
};

export default LatestArticlesComponent;
