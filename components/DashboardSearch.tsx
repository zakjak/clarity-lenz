"use client";

import z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SearchInputDashboard from "./SearchInputDashboard";

const SearchSchema = z.object({
  search: z.string(),
});

export type SearchFormValues = z.infer<typeof SearchSchema>;

const DashboardSearch = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("dashboardSearch") as string;

  const handleSearch = (data: string) => {
    router.push(
      `/dashboard/${session?.user?.id}?dashboardSearch=${data.split(" ").join("+")}`,
    );
  };

  return (
    <div className="flex-1 mx-10 ">
      <SearchInputDashboard onSearch={handleSearch} value={q as string} />
    </div>
  );
};

export default DashboardSearch;
