import AllVideos from "@/components/AllVideos";

export const dynamic = "force-dynamic";

const VideosPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const page = (await searchParams)?.page;
  return (
    <div>
      <AllVideos page={page as string} />
    </div>
  );
};

export default VideosPage;
