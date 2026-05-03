import Image from "next/image";
import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export const dynamic = "force-dynamic";

const AboutPage = () => {
  const staffs = [
    {
      id: 1,
      image: "/images/executives/zak.jpeg",
      name: "Yakubu Zakaria",
      position: "Digital Coordinator",
    },
    {
      id: 2,
      image: "/images/executives/boris.jpeg",
      name: "Boris Bate",
      position: "Director of Communications",
    },
    {
      id: 3,
      image: "/images/executives/aman.jpeg",
      name: "Aman Arora",
      position: "Logistics Manager",
    },
    {
      id: 4,
      image: "/images/executives/wuraola.jpeg",
      name: "Wuraola Ogooluwa",
      position: "Events Manager",
    },
  ];

  return (
    <div className="">
      <div className="lg:max-w-280 mx-auto ">
        <div className="flex flex-col gap-4 p-6 md:p-20 lg:p-24">
          <h4 className="text-[#E15724] text-[0.7rem]">ABOUT OUR VISION</h4>
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800 dark:text-zinc-300">
            Architecture of Purpose
          </h1>
          <div className="md:border-l-3 md:border-l-zinc-600 md:px-6 lg:w-[70%]">
            <p className="md:block hidden">
              Clarity Lenz is more than a platform—it is a movement dedicated to
              helping people find clarity, purpose, and direction in every area
              of life. We believe that when individuals are rightly aligned in
              their mindset, faith, relationships, and career, they become
              powerful instruments of impact.
            </p>
            <p className="block md:hidden">
              Clarity Lenz is a movement helping people find clarity, purpose,
              and direction. By aligning mindset, faith, relationships, and
              career, individuals unlock their potential and create meaningful
              impact.
            </p>
          </div>
          <div className="relative w-full h-55 md:h-88 rounded-sm overflow-hidden mt-6">
            <Image
              src="/images/clarity.webp"
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="grid lg:grid-cols-2 md:p-6 items-end">
            <h4 className="text-[#E15724] text-[0.7rem] my-4 lg:hidden">
              THE VISIONARY
            </h4>
            <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-800 dark:text-zinc-300 lg:hidden mb-2">
              Dr. Dorcas Eyinla (Drock)
            </h1>
            <p className="mb-2 text-sm block lg:hidden dark:text-zinc-200 text-zinc-700">
              PhD in Petroleum Engineering
            </p>
            <div className="relative h-100 lg:h-120 rounded-sm overflow-hidden">
              <Image
                src="/images/ceo.jpeg"
                fill
                alt="Ceo Dr. Dorcas Eyinla (Drock)"
                className="object-cover absolute"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 md:gap-6 pl-8 pt-10 lg:pt-0">
              <h4 className="text-[#E15724] text-[0.7rem]  hidden lg:block">
                THE VISIONARY
              </h4>
              <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-800 dark:text-zinc-300 hidden lg:block">
                Dr. Dorcas Eyinla (Drock)
              </h1>
              <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300">
                <p className="hidden lg:block">PhD in Petroleum Engineering</p>
                <p>
                  Clarity Lenz was founded by Dr. Dorcas Eyinla (Drock), a
                  distinguished professional with dual doctorates in Petroleum
                  Engineering and Petroleum Geoscience. While she actively works
                  within the oil and gas industry, her calling extends far
                  beyond her technical career.
                </p>
                <p>
                  Driven by a deep passion for transformation, she is committed
                  to raising a generation of whole, self-aware, and
                  purpose-driven individuals. This vision comes to life through
                  the{" "}
                  <span className="font-semibold">Love and Life Clinic—a</span>{" "}
                  mission she pioneered—which has earned her the name “The Love
                  Doctor.”
                </p>
                <p>
                  At the heart of her work is a clear mandate to nurture
                  individuals who are not only successful in their careers, but
                  also grounded in character, emotionally whole, and intentional
                  in their relationships.
                </p>
                <p>
                  With over <span className="font-semibold">15 years</span> of
                  continuous coaching and leadership experience, Dr. Dorcas
                  bridges the gap between professional mastery and spiritual
                  introspection. Through Clarity Lenz, she equips people to live
                  with clarity, purpose, and authenticity both in their personal
                  lives and professional journeys.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 pt-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800 dark:text-zinc-300">
              The Team
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {staffs.map((staff) => (
                <div key={staff.id} className="flex flex-col gap-1">
                  <div className="relative w-full h-55 rounded-sm overflow-hidden">
                    <Image
                      src={staff.image}
                      alt={`${staff.name} image`}
                      fill
                      className="absolute object-cover object-top"
                    />
                  </div>
                  <h2 className="font-semibold">{staff.name}</h2>
                  <p className="text-sm">{staff.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-[#131A2E] text-white p-8">
        <h1 className="text-3xl font-semibold pt-8">
          Connect with our Purpose.
        </h1>
        <p className=" w-[80%] md:w-[60%] lg:w-[40%] text-sm text-zinc-200">
          We are here to support your journey towards clarity. Whether you have
          questions about our mission or want to join the movement react out
        </p>
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <span className="text-sm">contact@mail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="rotate-90" />
          <span className="text-sm">+1 (434) 5435 5642</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
