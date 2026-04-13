import ArticleComponent from "@/components/ArticleComponent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number; slug: string }>;
}): Promise<Metadata> {
  const { id, slug } = await params;

  const article = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/article/${id}`,
    {
      cache: "no-store",
    },
  )
    .then((r) => r.json())
    .then((data) => data.article);

  if (!article || !Array.isArray(article) || !article[0]) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const texts = article && JSON.parse(article[0]?.story);

  const desc =
    texts && texts[0]?.children[0]?.text + " " + texts[0]?.children[2]?.text;

  return {
    title: article[0]?.title,
    description: desc,
    openGraph: {
      title: article[0]?.title,
      description: desc,
      url: `${process.env.NEXT_PUBLIC_API_URL}/${article[0]?.category}/${id}/${slug}`,
      images: [
        {
          url: article[0]?.image,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      siteName: "The Vybe News",
    },
    twitter: {
      card: "summary_large_image",
      title: article[0]?.title,
      description: desc,
      images: [article[0]?.image],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/${article[0]?.category}/${id}/${slug}`,
    },
  };
}

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params)?.id;

  if (!id) {
    return notFound();
  }

  return (
    <div>
      <ArticleComponent id={id} />
    </div>
  );
};

export default ArticlePage;
