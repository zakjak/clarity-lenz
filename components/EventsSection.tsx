import AllEvents from "./AllEvents";

const EventsSection = ({ page }: { page: string }) => {
  return (
    <div>
      <AllEvents page={page} />
    </div>
  );
};

export default EventsSection;
