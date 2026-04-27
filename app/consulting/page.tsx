import {
  FaEnvelope,
  FaFacebook,
  FaGraduationCap,
  FaLinkedin,
} from "react-icons/fa";
import { PiBagDuotone } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ConsultingPage = () => {
  const consultings = [
    {
      id: 1,
      title: "Educational Consulting",
      description:
        "Academy planning, study strategies and school/program selection.",
      icon: <FaGraduationCap size={40} className="text-blue-900" />,
    },
    {
      id: 2,
      title: "Career Development",
      description: "Resume reviews, interview, coaching and career transition.",
      icon: <PiBagDuotone size={40} className="text-blue-900" />,
    },
    {
      id: 3,
      title: "Marriage Counseling",
      description:
        "Communication, conflict, resolution and relationship support.",
      icon: <GiBigDiamondRing size={40} className="text-yellow-600" />,
    },
    {
      id: 4,
      title: "Life Coaching",
      description: "Goal setting, mindset shifts and personal growth",
      icon: <TbTargetArrow size={40} className="text-blue-900" />,
    },
  ];

  const contacts = [
    {
      id: 1,
      title: "Email Us",
      method: "mailto:zakjak456@gmail.com",
      icon: <FaEnvelope size={40} />,
    },
    {
      id: 1,
      title: "Facebook",
      method: "https://fb.com",
      icon: <FaFacebook size={40} />,
    },
    {
      id: 1,
      title: "X (Twitter)",
      method: "https://x.com",
      icon: <FaXTwitter size={40} />,
    },
    {
      id: 1,
      title: "LinkedIn",
      method: "https://linkedIn.com",
      icon: <FaLinkedin size={40} />,
    },
    {
      id: 1,
      title: "Youtube",
      method: "https://youtube.com",
      icon: <FaYoutube size={40} />,
    },
  ];

  return (
    <div className="pt-8">
      <h1 className="text-center p-8 text-2xl md:text-4xl font-semibold text-blue-900/90 dark:text-white border-b w-[80%] mx-auto">
        Consulting
      </h1>
      <h3 className="mt-4 text-sm text-zinc-700 text-center">
        We provide tailored services to help you grow in knowledge, career,
        relationships and personal fulfillment.
      </h3>
      <div className="grid md:grid-cols-2 gap-4 max-w-280 mx-auto mt-8 p-4">
        {consultings.map((consult) => (
          <div className=" bg-white shadow-lg px-6 py-4" key={consult.id}>
            <div className="flex items-center gap-2 border-b w-full">
              {consult.icon}
              <h2 className="text-xl text-blue-900 font-semibold">
                {consult.title}
              </h2>
            </div>
            <div className="text-xs py-4">
              <p>{consult.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <h1 className="text-center p-8 text-2xl md:text-4xl font-semibold text-blue-900/90 dark:text-white border-b w-[80%] mx-auto">
          Get In Touch
        </h1>
        <h3 className="mt-4 text-sm text-zinc-700 text-center">
          Have questions or want to get started? Contact us today!
        </h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-280 mx-auto my-8 p-4">
          {contacts.map((contact) => (
            <div className=" bg-white shadow-lg px-6 py-4" key={contact.id}>
              <div className="flex items-center gap-2 border-b w-full">
                <h2 className="text-xl text-blue-900 font-semibold">
                  {contact.title}
                </h2>
              </div>
              <div className="text-xs py-4">
                <Button variant="ghost">
                  <Link
                    href={contact.method}
                    target={contact.title !== "Email Us" ? "_blank" : "_parent"}
                    className="flex items-center gap-2"
                  >
                    {contact.icon}
                    {contact.title}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultingPage;
