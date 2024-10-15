import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
const RequestRegistration = () => {
  const navigate = useNavigate();
  return (
    <section className="w-[100%] my-2">
      <div className="bg-[#FFF2F2] text-center relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[35px] before:h-[35px] before:border before:border-[#ED0404] after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-[35px] after:h-[35px] after:border after:border-[#ED0404] p-6 rounded-md sm:w-[90%] md:w-[80%] lg:w-[50%] mx-auto h-auto flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-3">
          রক্তদানে আগ্রহী হলে রেজিস্ট্রেশন করুন
        </h1>
        <p className="text-[14px] tracking-wider leading-6 lg:text-left">
          প্রাণরক্ত কোন একক সংগঠন নয়, বরং রক্তদাতাদের একটি প্লাটফর্ম। সকল
          ব্যক্তির, সংগঠনের সুবিধার জন্যই। যাঁরা রক্ত দেন তাঁদেরকে এবং রক্তদান
          সম্পর্কিত বিভিন্ন সংগঠনগুলোকে এক প্লাটফর্মে নিয়ে এসে রক্ত দেওয়া-পাওয়ার
          কাজটা সহজ করাই এর উদ্দেশ্য। আপনিও রক্তদাতা হতে চাইলে website এ
          রেজিস্ট্রেশন করুন।
        </p>
        <button
          onClick={() => {
            navigate("/registration");
          }}
          className="flex mx-auto items-center justify-center gap-2 mt-5 bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
        >
          রেজিস্ট্রেশন করুন <FaArrowRightLong />
        </button>
      </div>
    </section>
  );
};

export default RequestRegistration;
