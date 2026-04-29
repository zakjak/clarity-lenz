"use client";

import { groupTotalNumbers } from "@/lib/utils/helpers";

import Filterbar from "./Filterbar";

type TotalProps = {
  totalUsers: number;
  totalCoAuthors: number;
  totalAdminUsers: number;
};

const DashboardStats = ({
  totalUsers,
  totalCoAuthors,
  totalAdminUsers,
}: TotalProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-280 mx-auto ">
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Total Users</h1>
        <h2 className="font-semibold">{groupTotalNumbers(totalUsers)}</h2>
      </div>
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Co-Authors</h1>
        <h2 className="font-semibold">{groupTotalNumbers(totalCoAuthors)}</h2>
      </div>
      <div className="bg-white shadow-lg p-4">
        <h1 className="font-semibold text-blue-950">Admin Users</h1>
        <h2 className="font-semibold">{groupTotalNumbers(totalAdminUsers)}</h2>
      </div>
      <Filterbar />
    </div>
  );
};

export default DashboardStats;
