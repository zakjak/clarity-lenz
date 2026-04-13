import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaRegCopyright } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full h-50 flex flex-col items-center bg-[#0F1117] ">
      <div className="h-50 w-60 relative">
        <Image
          src="/images/logo.png"
          fill
          className="w-full h-full object-cover absolute"
          alt="Clarity Lenz Logo"
        />
      </div>

      <div className="flex gap-4 mb-6 w-full justify-center border-b pb-1 text-white pb-2">
        <Link href="" target="_blank">
          <FaFacebook size={25} />
        </Link>
        <Link href="" target="_blank">
          <FaXTwitter size={25} />
        </Link>
        <Link href="" target="_blank">
          <FaLinkedin size={25} />
        </Link>
      </div>

      <div className="flex gap-2 items-center pb-4 text-white">
        <FaRegCopyright />
        <h2>{new Date().getFullYear()}</h2>
      </div>
    </div>
  );
};

export default Footer;
