import React from "react";

const WomenProtection = () => {
  return (
    <section className="container mx-auto p-3 min-h-[82vh] flex items-center justify-center">
      <div className="h-full flex justify-center items-center">
        <div className="w-[100%] sm:w-[80%] md:w-[70%] lg:w-[500px]  flex flex-col items-center justify-center gap-3 rounded-md overflow-hidden shadow-md">
          <h1 className="bg-[#ED0404] w-[100%] text-center text-white font-bold text-2xl h-[60px] flex items-center justify-center">
            নারী ডোনার প্রয়োজন ?
          </h1>
          <div className="p-3 text-start">
            <p className="text-sm text-justify">
              একজন নারী ডোনারের সাথে যোগাযোগ করতে হলে প্রথমে নিচে দেয়া তথ্য সহ
              আমাদের ম্যাসেজ অথবা ইমেইল করুন
            </p>
            <ul className="list-disc ml-3 mt-3">
              <li>রোগীর নাম</li>
              <li>রোগীর কি জন্য রক্ত প্রয়োজন?</li>
            </ul>
            <br />
            <p className="text-sm text-justify">
              আমরা আপনার দেয়া তথ্য সাপেক্ষে ডোনারের সাথে যোগাযোগ করবো। তিনি যদি
              রক্ত দিতে রাজি হন তাহলে আপনাকে তার নাম্বার দেয়া হবে।
            </p>
            <br />
            <a href="tel:01318195591" className="font-bold">
              01318195591
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenProtection;
