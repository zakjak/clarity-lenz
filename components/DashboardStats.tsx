"use client";

import { groupTotalNumbers } from "@/lib/utils/helpers";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiMenuAltLeft } from "react-icons/bi";
import { PiPencilSimpleBold } from "react-icons/pi";

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
    <div className="grid md:grid-cols-3 gap-4 ">
      <div className="bg-white shadow-lg p-8 dark:bg-[#1E293B] relative rounded-lg border-zinc-600 border-2">
        <h1 className=" text-blue-950 dark:text-[#516176]">Total Users</h1>
        <h2 className="font-semibold dark:text-yellow-400 lg:text-3xl text-2xl">
          {groupTotalNumbers(totalUsers)}
        </h2>
        <HiOutlineUsers
          className="absolute right-4 bottom-2 opacity-10"
          size={80}
        />
      </div>
      <div className="bg-white shadow-lg p-8 dark:bg-[#1E293B] relative rounded-lg border-zinc-600 border-2">
        <h1 className="text-blue-950 dark:text-[#516176]">Co-Authors</h1>
        <h2 className="font-semibold dark:text-yellow-400 lg:text-3xl text-2xl">
          {groupTotalNumbers(totalCoAuthors)}
        </h2>
        <BiMenuAltLeft
          size={80}
          className="absolute right-6 bottom-2 opacity-10"
        />
        <PiPencilSimpleBold
          className="absolute right-4 bottom-2 opacity-10"
          size={50}
        />
      </div>
      <div className="bg-white shadow-lg p-8 dark:bg-[#1E293B] relative rounded-lg border-zinc-600 border-2">
        <h1 className="text-blue-950 dark:text-[#516176]">Admin Users</h1>
        <h2 className="font-semibold dark:text-yellow-400 lg:text-3xl text-2xl">
          {groupTotalNumbers(totalAdminUsers)}
        </h2>
        <GoShieldCheck
          className="absolute right-4 bottom-2 opacity-10"
          size={80}
        />
      </div>
      <Filterbar />
    </div>
  );
};

export default DashboardStats;
