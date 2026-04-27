"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { groupTotalNumbers } from "@/lib/utils/helpers";
import { useSession } from "next-auth/react";
import Filterbar from "./Filterbar";
import UsersTable from "./UsersTable";

const DashboardStats = () => {
  const { data: session } = useSession();
  const { data } = useDashboard(session?.user?.id as string);

  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-280 mx-auto p-14">
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Total Users</h1>
        <h2 className="font-semibold">
          {groupTotalNumbers(data?.totalUsers[0]?.count)}
        </h2>
      </div>
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Co-Authors</h1>
        <h2 className="font-semibold">
          {groupTotalNumbers(data?.totalCoAuthors[0]?.count)}
        </h2>
      </div>
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Admin Users</h1>
        <h2 className="font-semibold">
          {groupTotalNumbers(data?.totalAdminUsers[0]?.count)}
        </h2>
      </div>
      <Filterbar />
      <UsersTable />
    </div>
  );
};

export default DashboardStats;
