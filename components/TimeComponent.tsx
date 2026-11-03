"use client";

import { useTimezoneStore } from "@/hooks/useBooking";
import SelectDateComponent from "./SelectDateComponent";
import SelectedTime from "./SelectedTime";

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

const TimeComponent = () => {
  const timezone = useTimezoneStore((state) => state.date);

  return (
    <div>
      <SelectDateComponent />
      <SelectedTime />
    </div>
  );
};

export default TimeComponent;
