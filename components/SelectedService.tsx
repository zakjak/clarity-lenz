"use client";

import { useBookingStore } from "@/hooks/useBooking";
import { FaRegClock } from "react-icons/fa";

const SelectedService = () => {
  const service = useBookingStore((state) => state);

  return (
    <div>
      {service.duration && (
        <>
          <h1 className="my-2 text-sm text-cyan-800">{service.title}</h1>
          <div className="flex gap-2 boorder border-b border-zinc-100 pb-2">
            <div className="">
              <div className={`${service.color} p-2 rounded-full`}>
                {service.icon}
              </div>
            </div>
            <div className="">
              <h2 className="text-sm font-semibold text-cyan-900">
                {service.title}
              </h2>
              <p className="text-xs w-[80%] text-cyan-800 my-1">
                {service.description}
              </p>
              <div className="flex items-center gap-1 text-cyan-900 text-xs">
                {service.duration && <FaRegClock />}

                <span>{service.duration}</span>
              </div>
            </div>
            <span>${service.price}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedService;
