import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaRegCopyright, FaEnvelope } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center border-t">
      <div className="h-30 w-55 relative ng-trf">
        <Image
          src="/images/logo.png"
          fill
          className="w-full h-full object-cover absolute"
          alt="Clarity Lenz Logo"
        />
      </div>

      <div className="flex gap-4 mb-6 w-full justify-center border-b pb-4">
        <Button variant="ghost" size="icon-lg" className="rounded-full">
          <Link href="" target="_blank" className="p-2  rounded-lg">
            <FaFacebook size={25} />
          </Link>
        </Button>
        <Button variant="ghost" size="icon-lg" className="rounded-full">
          <Link href="" target="_blank" className="p-2 rounded-lg">
            <FaXTwitter size={25} />
          </Link>
        </Button>

        <Button variant="ghost" size="icon-lg" className="rounded-full">
          <Link href="" target="_blank" className="p-2 rounded-lg">
            <FaLinkedin size={25} />
          </Link>
        </Button>

        <Button variant="ghost" size="icon-lg" className="rounded-full">
          <Link href="mailto:zakjak456@gmail.com" className="p-2 rounded-lg">
            <FaEnvelope size={25} />
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 items-center pb-4 text-sm">
        <FaRegCopyright />
        <h2>{new Date().getFullYear()}</h2>
        <p>Clarity Lenz. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
