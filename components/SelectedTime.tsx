"use client";
import { useDateStore, useSelectTimeStore } from "@/hooks/useBooking";
import { useBookings } from "@/hooks/useBookings";
import React, { useRef, useState } from "react";
import { ImBlocked } from "react-icons/im";

const availability = {
  monday: [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
    { id: 4, time: "1:00 PM" },
  ],
  tuesday: [
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

const switchDays = (date: number) => {
  let day;
  switch (date) {
    case 6:
      day = "Sunday";
      break;
    case 0:
      day = "Monday";
      break;
    case 1:
      day = "Tuesday";
      break;
    case 2:
      day = "Wednesday";
      break;
    case 3:
      day = "Thursday";
      break;
    case 4:
      day = "Friday";
      break;
    case 5:
      day = "Saturday";
  }
  return day;
};

function convertTo24Hour(time: string) {
  const [timePart, modifier] = time.split(" ");
  const [hours, minutes] = timePart.split(":");

  let selectedHours = Number(hours);

  selectedHours = parseInt(hours, 10);

  if (modifier.toUpperCase() === "PM" && selectedHours !== 12) {
    selectedHours += 12;
  }

  if (modifier.toUpperCase() === "AM" && selectedHours === 12) {
    selectedHours = 0;
  }

  return `${String(selectedHours).padStart(2, "0")}:${minutes}`;
}

const isTimeBooked = (selectTime: string, bookings, expires) => {
  return bookings?.some((booking) => {
    const bookingDate = booking.expiredAt.slice(0, 10);

    const bookingTime = booking.expiredAt.slice(11, 16);

    const isSameDate = bookingDate === expires;

    const isSameTime = bookingTime === convertTo24Hour(selectTime);

    return isSameDate && isSameTime ? true : false;
  });
};

const SelectedTime = () => {
  const selectTime = useSelectTimeStore((state) => state.changeTime);
  const timeRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const time = useSelectTimeStore((state) => state.time);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const { data: bookings, isLoading } = useBookings();
  const expires = useDateStore((state) => state.expiredAt);
  console.log(bookings);

  const selectedDay = switchDays(
    new Date(expires as string).getDay(),
  )?.toLowerCase();

  const availableTimes = selectedDay
    ? availability[selectedDay as keyof typeof availability]
    : [];

  const handleTime = (select: { id: number; time: string }) => {
    if (isTimeBooked(select.time, bookings, expires) && timeRef.current) {
      setSelectedTime(null);
      selectTime("");

      return;
    }

    setSelectedTime(select.id);
    selectTime(select.time);

    const hours = convertTo24Hour(select.time);

    selectTime(hours);
  };

  return (
    <div className="">
      <h2 className="text-sm text-cyan-950 font-semibold my-3">
        2. Select Time
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {availableTimes.map((select) => (
          <div
            ref={timeRef}
            key={select.id}
            className={`border p-4 text-xs ${isTimeBooked(select.time, bookings, expires) ? "bg-zinc-100 dark:bg-zinc-900" : "bg-white dark:bg-black"} font-black rounded-lg mt-2 cursor-pointer ${selectedTime === select.id && !isTimeBooked(select.time, bookings, expires) ? "border-violet-800 bg-blue-600 text-white" : "border-zinc-400 text-zinc-700"}`}
            onClick={() => handleTime({ id: select.id, time: select.time })}
          >
            <h1
              className={`${isTimeBooked(select.time, bookings, expires) && " text-[#6e6c8a] text-xl"}`}
            >
              {select.time}
            </h1>

            {isTimeBooked(select.time, bookings, expires) && (
              <span className="flex mt-2 gap-2 items-center ">
                <ImBlocked size={14} /> Booked
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTime;
