"use client";

import { useState } from "react";

const availability = [
  { id: 1, time: "09:00 AM" },
  { id: 2, time: "10:00 AM" },
  { id: 3, time: "11:00 AM" },
  { id: 4, time: "1:00 PM" },
  { id: 5, time: "2:00 PM" },
  { id: 6, time: "3:00 PM" },
  { id: 7, time: "4:00 PM" },
  { id: 8, time: "5:00 PM" },
];

const SelectedTime = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  console.log(selectedTime);

  return (
    <div className="">
      <h2 className="text-sm text-cyan-950 font-semibold my-3">
        2. Select Time
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {availability.map((select) => (
          <div
            key={select.id}
            className={`border p-4 text-xs font-black rounded-lg mt-2 cursor-pointer ${selectedTime === select.id ? "border-violet-800 bg-blue-600 text-white" : "border-zinc-400 text-zinc-700"}`}
            onClick={() => setSelectedTime(select.id)}
          >
            <h1>{select.time}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTime;
