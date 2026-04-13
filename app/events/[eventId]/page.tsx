import EventComponent from "@/components/EventComponent";

export const dynamic = "force-dynamic";

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: number }>;
}) => {
  const eventId = (await params)?.eventId;

  return (
    <div>
      <EventComponent id={eventId} />
    </div>
  );
};

export default EventPage;
