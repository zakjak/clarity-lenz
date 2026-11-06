import { EventProp } from "@/lib/types/users";
import { Card, CardTitle } from "./ui/card";
import { calculateTime } from "@/lib/utils/helpers";
import { Badge } from "./ui/badge";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

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
  return (
    <Card className="shadow-xl">
      <div className="flex gap-4 p-3">
        <div className="flex flex-col text-xs bg-violet-900 self-start rounded-md px-4 py-1  text-white">
          <span className="font-medium text-[.6rem]">
            {calculateTime(event?.eventStart)?.split(" ")[1]?.toUpperCase()}
          </span>
          <span className="font-black text-center">
            {calculateTime(event?.eventStart)?.split(" ")[0]}
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
        <Image
          width={200}
          height={200}
          src={event?.image}
          alt={`${event?.title}`}
          className="w-full h-32 rounded-sm object-cover"
        />
      )}
    </Card>
  );
};

export default LatestEventComponent;
