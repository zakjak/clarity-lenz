import AllArticles from "@/components/AllArticles";

export const dynamic = "force-dynamic";

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const page = (await searchParams)?.page;

  return (
    <div>
      <AllArticles page={page as string} />
    </div>
  );
};

export default ArticlesPage;
