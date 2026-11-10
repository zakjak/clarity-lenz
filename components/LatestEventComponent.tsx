import { EventProp } from "@/lib/types/users";
import { Card, CardTitle } from "./ui/card";
import { calculateTime } from "@/lib/utils/helpers";
import { Badge } from "./ui/badge";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

function convertTo12Hour(time: string) {
  const [, timePart] = time?.split(" ");
  const [hours, minutes] = timePart?.split(":");

  let selectedHours = Number(hours);

  selectedHours = parseInt(hours, 10);

  if (selectedHours !== 12) {
    selectedHours = selectedHours;
  }

  if (selectedHours > 12) {
    selectedHours = selectedHours - 12;
  }

  if (parseInt(hours, 10) >= 12) {
    return `${String(selectedHours).padStart(2, "0")}:${minutes} PM`;
  } else {
    return `${String(selectedHours).padStart(2, "0")}:${minutes} AM`;
  }
}

const LatestEventComponent = ({ event }: { event: EventProp }) => {
  console.log();
  return (
    <Card className="shadow-xl">
      <Link href={`/events/${event?.id}`}>
        <div className="flex gap-4 p-3">
          <div className="flex flex-col text-xs bg-violet-900 self-start rounded-md px-4 py-1  text-white">
            <span className="font-medium text-[.6rem]">
              {moment(new Date(event?.eventStart)).format("MMM")?.toUpperCase()}
            </span>
            <span className="font-black text-center">
              {moment(new Date(event?.eventStart)).format("Do")}
            </span>
          </div>
          <div className="md:w-[80%] flex flex-col gap-2">
            <Badge className="bg-violet-200 text-violet-800 text-[.6rem] font-semibold">
              {event?.title}
            </Badge>
            <CardTitle className="line-clamp-2 text-xs font-semibold">
              {event?.description}
            </CardTitle>
            <div className="flex flex-col">
              <span className="text-xs">
                {convertTo12Hour(event?.eventStart)}-
                {convertTo12Hour(event?.eventEnd)} (UTC)
              </span>
              <span className="text-[.6rem] flex items-center">
                <IoLocationOutline size={15} /> {event?.platform}
              </span>
            </div>
          </div>
        </div>
        {event?.image && (
          <div className="relative w-full h-32">
            <Image
              src={event?.image}
              alt={`${event?.title}`}
              className="w-full h-32 rounded-sm object-cover absolute"
              fill
            />
          </div>
        )}
      </Link>
    </Card>
  );
};

export default LatestEventComponent;
