"use client";

import React, { useState } from "react";
import CreateArticle from "./CreateArticle";
import SavedArticles from "./SavedArticles";
import { useSession } from "next-auth/react";
import CreateVideo from "./CreateVideo";

const UserArticleSection = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.isAdmin && (
        <div className="flex mt-3">
          <CreateArticle open={open} setOpen={setOpen} />
          <CreateVideo />
        </div>
      )}

      <SavedArticles setOpen={setOpen} id={id} />
    </div>
  );
};

export default UserArticleSection;
