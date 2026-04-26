"use client";

import React, { useState } from "react";
import CreateArticle from "./CreateArticle";
import SavedArticles from "./SavedArticles";
import { useSession } from "next-auth/react";
import CreateVideo from "./CreateVideo";
import SavedVideos from "./SavedVideos";

const UserArticleSection = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("articles");
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.isAdmin && (
        <div className="grid grid-cols-2 my-8 gap-2 ">
          <CreateArticle open={open} setOpen={setOpen} />
          <CreateVideo />
        </div>
      )}

      <div className=" p-4 rounded-2xl mb-4 shadow">
        <div className="flex items-center border-b-2 gap-4 font-bold">
          <div
            className={`${type === "articles" ? "border-b-4 border-blue-700 text-blue-800" : ""} cursor-pointer`}
            onClick={() => setType("articles")}
          >
            Articles
          </div>
          <div
            className={`${type === "videos" ? "border-b-4 border-blue-700 text-blue-800 font-bold" : ""} cursor-pointer`}
            onClick={() => setType("videos")}
          >
            Videos
          </div>
        </div>
        {type === "articles" ? (
          <SavedArticles setOpen={setOpen} id={id} type={type} />
        ) : (
          <SavedVideos id={id} type={type} />
        )}
      </div>
    </div>
  );
};

export default UserArticleSection;
