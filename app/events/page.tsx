import AddEventComponent from "@/components/AddEventComponent";
import AllEvents from "@/components/AllEvents";

const EventsPage = ({ searchParams }: { searchParams: { page?: string } }) => {
  const page = searchParams?.page;

  return (
    <div className="w-[90%] mx-auto">
      <AddEventComponent />
      <AllEvents page={page as string} />
    </div>
  );
};

export default EventsPage;
