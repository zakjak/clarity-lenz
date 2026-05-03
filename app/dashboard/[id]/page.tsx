import DashboardSection from "@/components/DashboardSection";

export const dynamic = "force-dynamic";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const page = (await searchParams)?.page;
  const q = (await searchParams)?.q;
  return (
    <div className="p-10">
      <h1 className="text-center p-8 text-2xl md:text-4xl font-semibold text-blue-900/90 dark:text-white border-b w-[80%] mx-auto">
        Admin Dashboard
      </h1>
      <h3 className="mt-4 text-sm text-zinc-700 text-center">
        Manage users and co-authors effectively
      </h3>

      <DashboardSection search={q as string} page={page as string} />
    </div>
  );
};

export default Dashboard;
