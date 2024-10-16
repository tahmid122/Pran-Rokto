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
              আমাদের ডিরেক্ট / হোয়াটস্যাপ ম্যাসেজ অথবা ইমেইল করুন।আর্জেন্ট হলে
              ম্যাসেজ বা ইমেইল সেন্ড করার পর প্রয়োজনে কল করতে পারেন।
            </p>
            <ul className="list-disc ml-3 mt-3 font-semibold text-sm">
              <li>রোগীর নাম কি?</li>
              <li>রোগীর কি জন্য রক্ত প্রয়োজন?</li>
              <li>কি পরিমাণ রক্ত লাগবে?</li>
              <li>রোগীর ঠিকানা।</li>
              <li>
                কোন হসপিটাল বা ক্লিনিকে রক্ত দিতে হবে তার নামসহ পূর্ণাঙ্গ
                ঠিকানা।
              </li>
              <li>রক্ত দানের তারিখ ও সময়।</li>
              <li>রোগীর অভিভাবকের মোবাইল নাম্বার।</li>
              <li>ডাক্তার কর্তৃক ইস্যুকৃত রিপোর্ট।</li>
            </ul>
            <br />
            <p className="text-sm text-justify">
              আমরা আপনার দেয়া তথ্য সাপেক্ষে ডোনারের সাথে যোগাযোগ করা হবে। তিনি
              যদি রক্ত দিতে রাজি হন তাহলে আমরা আপনার সাথে তার নাম্বার শেয়ার
              করবো।
            </p>
            <br />
            <div className="flex items-center justify-center gap-2">
              <span>মোবাইলঃ </span>
              <a href="tel:01318195591" className="font-bold">
                01318195591
              </a>
              {/* <span className="text-sm">
                (ডিরেক্ট ম্যাসেজ অথবা হোয়াটস্যাপ ম্যাসেজ)
              </span> */}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>ইমেইলঃ</span>
              <a href="mailto:tahmid098alam567@gmail.com" className="font-bold">
                tahmid098alam567@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenProtection;
