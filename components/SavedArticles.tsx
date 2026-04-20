"use client";

import { useSession } from "next-auth/react";
import CreatedArticles from "./CreatedArticles";
import { Dispatch, SetStateAction } from "react";

const SavedArticles = ({
  id,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="dark:bg-white bg-black w-1 h-8" />
        <h1 className="lg:text-3xl text-2xl font-bold tracking-wide my-4">
          Latest
        </h1>
      </div>
      <CreatedArticles ownerId={id as string} />
    </div>
  );
};

export default SavedArticles;
