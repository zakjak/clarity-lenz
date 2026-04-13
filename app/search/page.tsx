import AllSearch from "@/components/AllSearch";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const page = (await searchParams)?.page;
  const q = (await searchParams)?.q;

  return (
    <div>
      <AllSearch page={page as string} q={q as string} />
    </div>
  );
};

export default SearchPage;
