import AddEventComponent from "@/components/AddEventComponent";
import EventsSection from "@/components/EventsSection";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  return (
    <div className="w-[90%] mx-auto">
      <AddEventComponent />
      <EventsSection page={page as string} />
    </div>
  );
};

export default EventsPage;
