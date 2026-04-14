"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";

const Search = () => {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") as string;

  useEffect(() => {
    const handlePage = () => {
      const params = new URLSearchParams(window.location.search);
      const currentPage = Number(params.get("page")) || 1;
      setPage(currentPage);
    };
    handlePage();
  }, []);

  const handleSearch = (data: string) => {
    router.push(`/search?q=${data.split(" ").join("+")}&page=${page}`);
  };

  return (
    <div className="flex-1 mx-10 ">
      <SearchInput onSearch={handleSearch} value={q as string} />
    </div>
  );
};

export default Search;
