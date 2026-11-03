"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { useDateStore } from "@/hooks/useBooking";
import { OnSelectHandler } from "react-day-picker";
import { useBookings } from "@/hooks/useBookings";

const availability = {
  monday: [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
    { id: 4, time: "1:00 PM" },
  ],
  tueday: [
    { id: 5, time: "2:00 PM" },
    { id: 6, time: "3:00 PM" },
    { id: 7, time: "4:00 PM" },
    { id: 8, time: "5:00 PM" },
  ],
  wednesday: [
    { id: 9, time: "09:00 AM" },
    { id: 10, time: "10:00 AM" },
    { id: 11, time: "11:00 AM" },
    { id: 12, time: "1:00 PM" },
  ],
  thursday: [
    { id: 13, time: "2:00 PM" },
    { id: 14, time: "3:00 PM" },
    { id: 15, time: "4:00 PM" },
    { id: 16, time: "5:00 PM" },
  ],
  friday: [
    { id: 17, time: "09:00 AM" },
    { id: 18, time: "10:00 AM" },
    { id: 19, time: "11:00 AM" },
    { id: 20, time: "1:00 PM" },
  ],
  saturday: [],
  sunday: [],
};

const dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const switchDays = (date: number) => {
  let day;
  switch (date) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
};

const SelectDateComponent = () => {
  const changeDate = useDateStore((state) => state.changeDate);
  const expires = useDateStore((state) => state.expiredAt);
  const [date, setDate] = useState<Date | undefined>(new Date(new Date()));
  const { data: bookings, isLoading } = useBookings();

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
          onSelect={handleSelect}
          startMonth={date}
          disabled={{ before: new Date() }}
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
