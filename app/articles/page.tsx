import AllArticles from "@/components/AllArticles";

const ArticlesPage = async ({
  params,
}: {
  params: Promise<{ page?: string }>;
}) => {
  const { page } = await params;
  return (
    <div>
      <AllArticles page={page as string} />
    </div>
  );
};

export default ArticlesPage;
