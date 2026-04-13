"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useState } from "react";
import { getPaginationRange } from "@/lib/utils/helpers";
import { Button } from "./ui/button";
import Link from "next/link";

const PaginationComponent = ({
  pageNumber,
  query,
}: {
  pageNumber: number;
  query?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

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
                      ? `/search?q=${query}&page=${p}`
                      : `/politics?page=${p}`
                  }
                >
                  <Button disabled={p === "..."}>{p}</Button>
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
