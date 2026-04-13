"use client";

import { useSession } from "next-auth/react";
import CreatedArticles from "./CreatedArticles";
import { Dispatch, SetStateAction } from "react";

const SavedArticles = ({
  setOpen,
  id,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="dark:bg-white bg-black w-1 h-8" />
        <h1 className="lg:text-3xl text-2xl font-bold tracking-wide my-4">
          Latest
        </h1>
      </div>
      {session?.user && (
        <CreatedArticles ownerId={id as string} setOpen={setOpen} />
      )}
    </div>
  );
};

export default SavedArticles;
