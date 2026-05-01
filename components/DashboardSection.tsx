"use client";
import DashboardStats from "./DashboardStats";
import TablePanel from "./TablePanel";
import { useSession } from "next-auth/react";
import {
  useDashboardStats,
  useDashboardUsersTable,
} from "@/hooks/useDashboard";
import { useState } from "react";
import { redirect } from "next/navigation";

const DashboardSection = () => {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useDashboardStats(session?.user?.id as string, currentPage);
  const { data: allUsers } = useDashboardUsersTable(
    session?.user?.id as string,
  );

  if (status === "loading") {
    return null;
  }

  if (!session?.user?.isAdmin && !session?.user?.isOwner) {
    redirect("/");
  }

  return (
    <div className="p-14 max-w-280 mx-auto">
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
      <div className="mt-10 flex flex-col gap-4 lg:w-[70%]">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Admin:</h1>
          <p className="text-sm ml-10">
            Maka a user Admin, relative no impact, they cannot edit, but they
            delete items such as articles, videos or events
          </p>
        </div>
        <div className="">
          <h1 className="font-semibold whitespace-nowrap">Co-Author:</h1>
          <p className="ml-10">
            Maka a user co-author, you can make the user a co-author, so they
            can have the ability to add items such as articles, videos or
            events, but they cannot delete anything from database, they can only
            delete their articles, events or videos
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <h1 className="font-semibold whitespace-nowrap">
              Make Admin and Co-author:
            </h1>
            <p className="ml-10">
              Becareful with this actions, This action gives users absolute
              power and they can edit, delete or manipulate or even delete users
              from the database
            </p>
          </div>

          <div className="flex gap-2 items-center ml-10">
            <span className="font-semibold">Note:</span>
            <p className="text-sm">
              Only key members or executives within the organization should have
              this power or authority
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
