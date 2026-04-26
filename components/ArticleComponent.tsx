"use client";

import { useArticle, useRelatedArticles } from "@/hooks/useArticle";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";
import ArticleComponentSkeleton from "./ArticleComponentSkeleton";
import ArticleStory from "./ArticleStory";
import RelatedArticles from "./RelatedArticles";
import CommentSection from "./CommentSection";

const ArticleComponent = ({ id }: { id: number }) => {
  const { data, isFetching, isLoading } = useArticle(id);
  const { data: session } = useSession();
  const { ref, inView } = useInView({ threshold: 0 });

  const { data: relatedArticles } = useRelatedArticles(
    data && data?.article[0]?.category,
    id,
  );

  if (isLoading) {
    return <ArticleComponentSkeleton />;
  }

  return (
    <div className=" w-[90%] lg:w-7xl mx-auto">
      <div className="grid lg:gap-8 gap-4 lg:grid-cols-6 md:grid-cols-5">
        {/* Left Section */}
        {data?.article && <ArticleStory articleStory={data} />}

        {/* Right Section */}
        {data && <RelatedArticles articles={relatedArticles} />}
      </div>
      {session ? (
        <div ref={ref} className="mt-8">
          <CommentSection
            postId={data.article[0]?.id ?? 0}
            ownerId={session?.user?.id}
            inView={inView}
          />
        </div>
      ) : (
        <h1 className="text-xl my-4 font-bold">
          Login to view and comment on articles
        </h1>
      )}
    </div>
  );
};

export default ArticleComponent;
