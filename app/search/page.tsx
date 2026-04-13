import AllSearch from "@/components/AllSearch";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const { page, q } = await searchParams;

  return (
    <div>
      <AllSearch page={page as string} q={q as string} />
    </div>
  );
};

export default SearchPage;
