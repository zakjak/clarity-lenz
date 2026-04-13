import AllArticles from "@/components/AllArticles";

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
