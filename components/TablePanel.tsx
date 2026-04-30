import React, { Dispatch, SetStateAction } from "react";
import UsersTable from "./UsersTable";
import { User } from "@/lib/types/users";
import DashboardPaginationUsers from "./DashboardPaginationUsers";

const TablePanel = ({
  users,
  pageNumber,
  currentPage,
  setCurrentPage,
}: {
  users: User[];
  pageNumber: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="border">
      <UsersTable users={users} />
      {pageNumber > 1 && (
        <DashboardPaginationUsers
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TablePanel;
