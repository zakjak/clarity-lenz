"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "./ui/calendar";

const SelectDateComponent = () => {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 6),
  );

  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 0, 12 + i),
  );
  return (
    <div>
      <h2 className="text-sm my-4 text-cyan-950 font-semibold ">
        1. Select Date
      </h2>
      <Card className="w-[80%] ">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{
            booked: "npm dlx shadcn@latest add calendar",
          }}
        />
      </Card>
    </div>
  );
};

export default SelectDateComponent;
