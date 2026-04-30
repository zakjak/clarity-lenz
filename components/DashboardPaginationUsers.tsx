"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";
import { getPaginationRange } from "@/lib/utils/helpers";
import { Button } from "./ui/button";
import { useDashboardUsers } from "@/hooks/useDashboard";
import { useRouter, useSearchParams } from "next/navigation";

const DashboardPaginationUsers = ({
  pageNumber,
  query,
  currentPage,
  setCurrentPage,
}: {
  pageNumber: number;
  query?: string;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate } = useDashboardUsers();

  const handlePagination = (page: number) => {
    if (page < 1 || page > pageNumber) return;
    setCurrentPage(page);
    mutate(page);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage));
    router.push(`?${params.toString()}`);
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
                <Button
                  onClick={() => handlePagination(Number(p))}
                  disabled={p === "..."}
                >
                  {p}
                </Button>
              </div>
            ),
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPaginationUsers;
