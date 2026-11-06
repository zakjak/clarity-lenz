import BookingUserDetails from "@/components/BookingUserDetails";
import SelectedService from "@/components/SelectedService";
import SelectedServicesComponent from "@/components/SelectedServicesComponent";
import TimeComponent from "@/components/TimeComponent";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Booking = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 h-80 md:h-120">
        <div className="flex flex-col justify-center font-semibold pl-10 bg-[#FAF9FD]">
          <h1 className="lg:text-6xl md:text-4xl text-zinc-700">
            Book Appointment
          </h1>
          <p className="text-xs text-zinc-600 mt-4 w-[60%] md:w-[30%]">
            Take the first step towards a better you. Book your session with
            ease
          </p>
        </div>
        <div className="relative">
          <div className="w-50 h-full bg-linear-to-r from-[#FAF9FD] to-transparent absolute z-50" />
          <Image
            src="/images/booking-banner.png"
            fill
            className="absolute object-cover"
            alt="Booking banner image, has soffer chair, round table and on it has 2 books, 2 jars, 1 contains a flower"
          />
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-zinc-800 font-semibold">
          Our Consultation Services
        </h1>
        <p className="text-xs text-zinc-500 mt-2 mb-4">
          Select a category below to book your session
        </p>
        <div className="grid grid-cols-2 gap-8">
          <SelectedServicesComponent />
          <div className="border border-blue-100 p-4 rounded-lg">
            <h1 className="text-blue-900 font-black">Booking Details</h1>
            <SelectedService />
            <TimeComponent />
            <BookingUserDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
