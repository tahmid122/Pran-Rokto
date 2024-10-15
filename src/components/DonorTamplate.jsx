import React from "react";
import { FaFacebook, FaWhatsapp, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
const DonorTamplate = () => {
  return (
    <div className="w-[95%] flex flex-col items-center justify-center gap-3 p-3 shadow-md rounded-sm border-t-4 border-[#ED0404] lg:w-[60%] lg:flex-row lg:justify-center lg:gap-14 lg:h-[400px]">
      <img
        src="/public/profile-pic.png"
        alt=""
        className="h-[150px] w-[150px] rounded-full object-cover lg:w-[200px] lg:h-[200px]"
      />
      <div>
        <h1 className="font-bold text-xl">মোঃ তাহমিদ আলম</h1>
        <ul className="flex flex-col gap-2 text-[15px] mt-2">
          <li>
            <span className="font-bold mr-2">মোবাইলঃ</span>
            <span>
              <a href="#">01318195591</a>
            </span>
          </li>
          <li>
            <span className="font-bold mr-2">রক্তের গ্রুপঃ</span>
            <span>A+</span>
          </li>
          <li>
            <span className="font-bold mr-2">সর্বশেষ রক্তদানঃ</span>
            <span>November - 2023</span>
          </li>
          <li>
            <span className="font-bold mr-2">জেন্ডারঃ</span>
            <span>পুরুষ</span>
          </li>
          <li>
            <span className="font-bold mr-2">স্থায়ী ঠিকানাঃ</span>
            <span>ধাপেরহাট, সদর, রংপুর, রংপুর সদর, রংপুর, Bangladesh</span>
          </li>
          <li>
            <span className="font-bold mr-2">বর্তমান ঠিকানাঃ</span>
            <span>ধাপেরহাট, সদর, রংপুর, রংপুর সদর, রংপুর, Bangladesh</span>
          </li>
        </ul>
        {/* <div className="flex justify-around items-center mt-5 pb-2">
          <a href="#">
            <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
          <a href="#">
            <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default DonorTamplate;
