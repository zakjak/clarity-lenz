"use client";

import CreatedArticles from "./CreatedArticles";
import { Dispatch, SetStateAction } from "react";

const SavedArticles = ({
  id,
  type,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  type: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {/* <div className="dark:bg-white bg-black w-1 h-8" /> */}
        <h1 className="lg:text-3xl text-2xl font-bold tracking-wide my-4 capitalize">
          Latest {type}
        </h1>
      </div>
      <CreatedArticles ownerId={id as string} type={type} />
    </div>
  );
};

export default SavedArticles;
