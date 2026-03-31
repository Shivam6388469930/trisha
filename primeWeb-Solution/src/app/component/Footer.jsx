"use client";

import React from "react";
import { CiMail } from "react-icons/ci";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaInstagramSquare,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";

const socialLinks = [
  { icon: FaFacebookF, link: "https://facebook.com" },
  { icon: FaInstagramSquare, link: "https://instagram.com" },
  { icon: FaLinkedinIn, link: "https://linkedin.com" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/project", label: "Portfolio" },
  { href: "/services", label: "Our Services" },
  { href: "/about", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/services?website", label: "Website Development" },
  { href: "/services?mobile", label: "Mobile Development" },
  { href: "/services?website", label: "Software Development" },
  { href: "/iot_development", label: "Data Analysist" },
  { href: "/services?ui", label: "UI/UX" },
  { href: "/services?seo", label: "SEO" },
  { href: "/services?website", label: "WordPress Website" },
  { href: "/services?vedio", label: "Vedio Editing" },
];

const Footer = () => {
  return (
    <>
      {/* MAIN FOOTER */}
     <footer className="bg-black text-white z-[999] py-16 px-5 font-sans w-full">
  <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
    
    {/* Office Address */}
    <div>
      <h5 className="text-xl font-bold mb-6 border-b-2 border-white pb-2">
        Our Office Address
      </h5>

      <p className="mb-3 flex items-center text-gray-300">
        <FaMapMarkerAlt className="mr-3 text-yellow-400" />
        Noida Sector 62, Uttar Pradesh
      </p>

      <p className="mb-3 flex items-center text-gray-300">
        <FaPhoneAlt className="mr-3 text-yellow-400" />
        6388469930, 9598705515
      </p>

      <p className="mb-3 flex items-center text-gray-300">
        <CiMail className="mr-3 text-yellow-400" />
        trishaconsultancyservices.tcs@gmail.com
      </p>

      <div className="flex gap-4 mt-4">
        {socialLinks.map(({ icon: Icon, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-lg shadow-md hover:bg-yellow-400 hover:text-[#011a40] transition"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h5 className="text-xl font-bold mb-6 border-b-2 border-white pb-2">
        Quick Links
      </h5>
      <nav className="flex flex-col space-y-2 text-gray-300">
        {quickLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-yellow-400 hover:underline transition"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>

    {/* Services */}
    <div>
      <h5 className="text-xl font-bold mb-6 border-b-2 border-white pb-2">
        Services
      </h5>
      <nav className="flex flex-col space-y-2 text-gray-300">
        {services.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-yellow-400 hover:underline transition"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>

    {/* Newsletter */}
    <div>
      <h5 className="text-xl font-bold mb-6 border-b-2 border-white pb-2">
        Newsletter
      </h5>
      <p className="text-gray-400 mb-5">
        Subscribe to our newsletter for updates
      </p>

      <input
        type="email"
        placeholder="Your email address"
        className="w-full bg-transparent border border-gray-600 rounded-md py-3 px-4 placeholder-gray-400 text-white focus:outline-none focus:border-yellow-400 transition"
      />

      <button className="text-black mt-4 w-full bg-white font-semibold py-3 rounded-full hover:bg-blue-100 transition" onClick={()=>alert("You have successfully subscribed")}>
        Subscribe Now
      </button>
    </div>

  </div>
</footer>


      {/* BOTTOM BAR */}
      <div className="bg-black text-gray-300 text-center py-4 border-t border-dashed border-[#1c3c6ba8]">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-yellow-400">
            Trisha Consultancy Services
          </span>
          <Link href="/terms&condition" className="hover:text-yellow-400"> | Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-yellow-400"> | Privacy</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
