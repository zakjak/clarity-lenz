"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoIosSearch } from "react-icons/io";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchSchema = z.object({
  search: z.string(),
});

export type SearchFormValues = z.infer<typeof SearchSchema>;

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const DashboardSearch = ({ onSearch }: SearchInputProps) => {
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

  const onSubmit = (data: SearchFormValues) => [onSearch(data.search)];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1 text-zinc-900 dark:text-white">
        <Input
          {...register("search")}
          type="text"
          placeholder="Search Email or name..."
          className="flex-1 w-full"
        />
      </div>
      <Button type="submit" variant="outline" className="cursor-pointer">
        <IoIosSearch />
      </Button>
    </form>
  );
};

export default DashboardSearch;
