"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { useDateStore } from "@/hooks/useBooking";
import { OnSelectHandler } from "react-day-picker";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const SelectDateComponent = () => {
  const changeDate = useDateStore((state) => state.changeDate);
  const [date, setDate] = useState<Date | undefined>(new Date(new Date()));

  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 0, 12 + i),
  );

  const handleSelect: OnSelectHandler<Date | undefined> = (selectedDate) => {
    setDate(selectedDate);
    changeDate(
      `${selectedDate?.getFullYear()}-${String(Number(selectedDate?.getMonth()) + 1).padStart(2, "0")}-${String(selectedDate?.getDate()).padStart(2, "0")}`,
    );
  };

  useEffect(() => {
    changeDate(formatDate(date as Date));
  }, [date, changeDate]);

  return (
    <div className="lg:h-[42vh]">
      <h2 className="text-sm my-4 text-cyan-950 font-semibold ">
        1. Select Date
      </h2>
      <Card className="h-full">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={handleSelect}
          startMonth={date}
          disabled={{ before: new Date() }}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{
            booked: "npm dlx shadcn@latest add calendar",
          }}
          className="h-full w-full"
        />
      </Card>
    </div>
  );
};

export default SelectDateComponent;
