import React, { useState } from "react";

const ForgetPassword = () => {
  const [loginDetails, setLoginDetails] = useState({
    mobile: "",
    password: "",
  });

  const getLoginDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  return (
    <section
      className="container mx-auto p-5 min-h-[82vh] flex items-center justify-center
"
    >
      <div className="h-full flex justify-center items-center">
        <div className="w-[100%] sm:w-[80%] md:w-[70%] lg:w-[500px]  flex flex-col items-center justify-center gap-3 rounded-md overflow-hidden shadow-md">
          <h1 className="bg-[#ED0404] w-[100%] text-center text-white font-bold text-2xl h-[60px] flex items-center justify-center">
            পাসওয়ার্ড ভুলে গেছেন?
          </h1>
          {/* <form className="w-[100%]">
            <div className=" w-[100%] min-h-[300px] py-2 px-5 flex flex-col justify-center">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="মোবাইল নাম্বার"
                  className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                >
                  মোবাইল নাম্বার
                </label>
                <input
                  type="text"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="মোবাইল নাম্বার"
                  name="mobile"
                  onChange={getLoginDetails}
                />
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="মোবাইল নাম্বার"
                  className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                >
                  ইমেইল
                </label>
                <input
                  type="text"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="ইমেইল"
                  name="email"
                  onChange={getLoginDetails}
                />
              </div>
              <div className="flex items-center justify-between  w-[100%] h-[100%] mb-5">
                <button
                  className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                  type="submit"
                >
                  সাবমিট করুন
                </button>
              </div>
            </div>
          </form> */}
          <div className="p-3 text-center">
            <p className="text-sm text-justify">
              একাউন্ট খোলার সময় ব্যাবহত মোবাইল নাম্বার অথবা ইমেইল সহ নিচে দেয়া
              নাম্বারে হোয়াটসাপে ম্যাসেজ করুন।খুব শিগ্রহই আপনার সাথে যোগাযোগ করা
              হবে।
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

export default ForgetPassword;
