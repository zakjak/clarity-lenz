"use client";
import React, { useState } from "react";
import { FaGraduationCap, FaRegClock } from "react-icons/fa";
import { PiBagFill, PiHeartStraightBreakBold } from "react-icons/pi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { BiSolidLeaf } from "react-icons/bi";
import { Services, useBookingStore } from "@/hooks/useBooking";

const services = [
  {
    id: 1,
    title: "Educational Consulting",
    description:
      "Academy planning, study strategies and school/program selection.",
    price: 2,
    icon: <FaGraduationCap size={30} />,
    color: "bg-blue-100 text-blue-600",
    duration: 60,
  },
  {
    id: 2,
    title: "Career Development",
    description: "Resume reviews, interview, coaching and career transition.",
    price: 750,
    icon: <PiBagFill size={30} />,
    color: "bg-green-100 text-green-600",
    duration: 60,
  },
  {
    id: 3,
    title: "Marriage Counseling",
    description:
      "Communication, conflict, resolution and relationship support.",
    icon: <PiHeartStraightBreakBold size={30} />,
    color: "bg-red-100 text-red-600",
    price: 750,
    duration: 60,
  },
  {
    id: 4,
    title: "Public Speaking",
    description:
      "Speech delivery, confidence building and effective audience engagement.",
    icon: <HiOutlineMicrophone size={30} />,
    color: "bg-violet-100 text-violet-600",
    price: 750,
    duration: 60,
  },
  {
    id: 5,
    title: "Life Coaching",
    description: "Goal setting, mindset shifts and personal growth.",
    color: "bg-amber-100 text-amber-600",
    icon: <BiSolidLeaf size={26} />,
    price: 750,
    duration: 60,
  },
];

const SelectedServicesComponent = () => {
  const [selectedService, setSelectedService] = useState<
    number | null | undefined
  >(null);
  const changeServices = useBookingStore((state) => state.changeServices);

  const handleSelection = (select: Services) => {
    setSelectedService(select.id);
    changeServices(
      select.title,
      select.description,
      select.price,
      select.icon,
      select.color,
      select.duration,
    );
  };

  return (
    <div className="">
      <h2>1. Choose a Service</h2>
      {services.map((select) => {
        const isSelected = selectedService === select.id;

        return (
          <div
            key={select.id}
            className={`flex gap-2 border p-4 rounded-lg mt-2 cursor-pointer relative ${isSelected ? "border-blue-600 bg-blue-50 dark:bg-zinc-800" : "border-zinc-400"}`}
            onClick={() => handleSelection(select)}
          >
            <div className={`${select.color} self-start p-2 rounded-full`}>
              {select.icon}
            </div>
            <div>
              <h1 className="text-sm font-bold text-cyan-900 dark:text-white">
                {select.title}
              </h1>
              <p className="text-[0.7rem] text-cyan-900 my-1 dark:text-white">
                {select.description}
              </p>
              <div className="flex items-center gap-2 text-cyan-900 dark:text-white">
                <div className="flex items-center text-xs gap-2">
                  <FaRegClock />
                  <span>{select.duration} minutes</span>
                </div>
                <span className="text-sm font-bold">${select.price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedServicesComponent;
