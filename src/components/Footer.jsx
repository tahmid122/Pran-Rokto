import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <section>
      <div className="flex items-center justify-between p-3 bg-black flex-col gap-2 md:flex-row">
        <div className="text-sm text-white">
          &copy;2024 প্রাণরক্ত ।। সব অধিকার সংরক্ষিত.
        </div>
        <div className="text-white text-sm">
          বাস্তবায়নেঃ{" "}
          <a
            href="https://tahmidalam.vercel.app/"
            target="_blank"
            className="text-[#ED0404] font-bold"
          >
            তাহমিদ আলম
          </a>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/TahmidAlamJG"
            target="_blank"
            className="cursor-pointer text-white text-xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://m.me/TahmidAlamJG"
            target="_blank"
            className="cursor-pointer text-white text-xl"
          >
            <FaFacebookMessenger />
          </a>
          <a
            href="https://www.linkedin.com/in/tahmidalam122/"
            target="_blank"
            className="cursor-pointer text-white text-xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
