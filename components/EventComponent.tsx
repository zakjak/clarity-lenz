"use client";

import { useEvent } from "@/hooks/useEvents";
import EventLayout from "./EventLayout";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

const EventComponent = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const { data, isFetching, isLoading } = useEvent(
    id,
    session?.user?.id as string,
  );

  return (
    <Suspense fallback={"Loading..."}>
      <div className="lg:w-[50%] md:w-[70%] w-[80%] mx-auto">
        {data && <EventLayout event={data[0]} />}
      </div>
    </Suspense>
  );
};

export default EventComponent;
