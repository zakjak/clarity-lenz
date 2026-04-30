import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaRegCopyright, FaEnvelope } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full border-t md:p-6">
      <div className="md:flex">
        <div className="h-30 w-55 relative">
          <Image
            src="/images/logo.png"
            fill
            className="w-full h-full object-cover absolute"
            alt="Clarity Lenz Logo"
          />
        </div>
        <div className="md:grid md:grid-cols-2 gap-10 pt-4 flex justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Company</h1>
            <Link href="/about-us">About us</Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <h1 className="font-semibold whitespace-nowrap">Contact Us</h1>
            </div>
            <div className="flex items-center cursor-pointer hover:bg-zinc-950 p-1 rounded-lg">
              <p>Facebook</p>
              <Link href="" target="_blank" className="p-2">
                <FaFacebook size={15} />
              </Link>
            </div>
            <div className="flex items-center cursor-pointer hover:bg-zinc-950 p-1 rounded-lg">
              <p>Twitter(X)</p>
              <Link href="" target="_blank" className="p-2">
                <FaXTwitter size={15} />
              </Link>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-zinc-950 p-1 rounded-lg">
              <p>LinkedIn</p>
              <Link href="" target="_blank" className="p-2 rounded-lg">
                <FaLinkedin size={15} />
              </Link>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-zinc-950 p-1 rounded-lg">
              <p>Email</p>
              <Link
                href="mailto:zakjak456@gmail.com"
                className="p-2 rounded-lg"
              >
                <FaEnvelope size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center pb-4 text-sm w-full p-6">
        <FaRegCopyright />
        <h2>{new Date().getFullYear()}</h2>
        <p>Clarity Lenz. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
