"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useState } from "react";
import { getPaginationRange, slugify } from "@/lib/utils/helpers";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaginationComponent = ({
  pageNumber,
  query,
}: {
  pageNumber: number;
  query?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const isFirstPage = !page || page === 1;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > pageNumber) return;
    setCurrentPage(page);
  };

  const paginationRange = getPaginationRange(currentPage, pageNumber);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="flex gap-3">
          {paginationRange.map((p, i) =>
            p === "..." ? (
              <span key={i} className="font-semibold">
                ...
              </span>
            ) : (
              <div key={i} className="">
                <Link
                  onClick={() => handlePageClick(p as number)}
                  href={
                    query
                      ? `/search?q=${slugify(query)}&page=${p}`
                      : `/articles?page=${p}`
                  }
                >
                  <Button
                    disabled={p === "..."}
                    variant={`${Number(page) === p || isFirstPage ? "secondary" : "outline"}`}
                    className={`${Number(page) === p ? "border dark:border-white border-amber-800 text-amber-800 dark:text-white" : ""} cursor-pointer`}
                  >
                    {p}
                  </Button>
                </Link>
              </div>
            ),
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
