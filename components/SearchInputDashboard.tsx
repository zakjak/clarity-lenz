import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchFormValues,
  SearchInputProps,
  SearchSchema,
} from "./SearchInput";

const SearchInputDashboard = ({ onSearch, value }: SearchInputProps) => {
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
  }, []);

  const onSubmit = (data: SearchFormValues) => [onSearch(data.search)];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1 text-zinc-900 dark:text-white">
        <Input
          {...register("search")}
          type="text"
          placeholder="Search..."
          className="flex-1 w-full"
        />
      </div>
      <Button type="submit" variant="outline" className="cursor-pointer">
        <IoIosSearch />
      </Button>
    </form>
  );
};

export default SearchInputDashboard;
