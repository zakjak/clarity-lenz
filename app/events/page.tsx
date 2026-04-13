import AddEventComponent from "@/components/AddEventComponent";
import AllEvents from "@/components/AllEvents";

export const dynamic = "force-dynamic";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const page = (await searchParams).page;

  return (
    <div className="w-[90%] mx-auto">
      <AddEventComponent />
      <AllEvents page={page as string} />
    </div>
  );
};

export default EventsPage;
