"use client";

import React, { useState } from "react";
import CreateArticle from "./CreateArticle";
import SavedArticles from "./SavedArticles";
import { useSession } from "next-auth/react";

const UserArticleSection = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  console.log(id);

  return (
    <div>
      {session?.user?.isAdmin && (
        <CreateArticle open={open} setOpen={setOpen} />
      )}

      <SavedArticles setOpen={setOpen} id={id} />
    </div>
  );
};

export default UserArticleSection;
