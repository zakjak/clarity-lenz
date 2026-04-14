"use client";

import z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const SearchSchema = z.object({
  search: z.string().min(1, { message: "Search query cannot be empty" }),
});

export type SearchFormValues = z.infer<typeof SearchSchema>;

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch, value }: SearchInputProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (value) {
      setValue("search", value);
    }
  });

  const onSubmit = (data: SearchFormValues) => [onSearch(data.search)];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1 text-zinc-100">
        <Input
          {...register("search")}
          type="text"
          placeholder="Search..."
          className="flex-1 w-full "
        />
      </div>
      <Button type="submit" variant="outline" className="cursor-pointer">
        <IoIosSearch />
      </Button>
    </form>
  );
};

export default SearchInput;
