"use client";
import DashboardStats from "./DashboardStats";
import TablePanel from "./TablePanel";
import { useSession } from "next-auth/react";
import {
  useDashboardStats,
  useDashboardUsersTable,
} from "@/hooks/useDashboard";
import { useState } from "react";

const DashboardSection = () => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useDashboardStats(session?.user?.id as string, currentPage);
  const { data: allUsers } = useDashboardUsersTable(
    session?.user?.id as string,
  );

  return (
    <div className="p-14">
      <DashboardStats
        totalUsers={data?.totalUsers[0]?.count}
        totalCoAuthors={data?.totalCoAuthors[0]?.count}
        totalAdminUsers={data?.totalAdminUsers[0]?.count}
      />
      <TablePanel
        users={allUsers?.users}
        pageNumber={data?.pageNumber}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DashboardSection;
