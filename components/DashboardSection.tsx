"use client";
import DashboardStats from "./DashboardStats";
import TablePanel from "./TablePanel";
import { useSession } from "next-auth/react";
import { useDashboard } from "@/hooks/useDashboard";
import { useState } from "react";

const DashboardSection = () => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useDashboard(session?.user?.id as string, currentPage);

  //   console.log(data);

  return (
    <div className="p-14">
      <DashboardStats
        totalUsers={data?.totalUsers[0]?.count}
        totalCoAuthors={data?.totalCoAuthors[0]?.count}
        totalAdminUsers={data?.totalAdminUsers[0]?.count}
      />
      <TablePanel
        users={data?.users}
        pageNumber={data?.pageNumber}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DashboardSection;
