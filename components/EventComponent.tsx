"use client";

import { useEvent } from "@/hooks/useEvents";
import EventLayout from "./EventLayout";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import { authClient } from "@/lib/auth-client";

const EventComponent = ({ id }: { id: number }) => {
  const { data: session } = authClient.useSession();
  const { data, isFetching, isLoading } = useEvent(
    id,
    session?.user?.id as string,
  );

  if (isLoading) {
    return <LatestArticlesSkeleton />;
  }

  return (
    <div className="lg:w-5xl md:w-[70%] w-[80%] mx-auto">
      {data && <EventLayout event={data[0]} />}
    </div>
  );
};

export default EventComponent;
