import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import LatestArticles from "./LatestArticles";
import { FaArrowRight } from "react-icons/fa6";

const LatestArticlesComponent = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">Latest Articles</h2>
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
