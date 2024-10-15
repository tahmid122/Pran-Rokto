import React, { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;
const OurOverview = () => {
  const [donors, setDonors] = useState("");
  const getDonors = async () => {
    const res = await fetch(`${apiUrl}/all-donors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDonors(data);
  };
  useEffect(() => {
    getDonors();
  }, []);

  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-10 mt-5 py-5 px-2 w-[100%]">
      <div>
        <h1 className="text-2xl font-bold  border-b-4 border-dashed border-[#ED0404] border-spacing-2 pb-2">
          আমাদের রয়েছে
        </h1>
      </div>
      <div className="flex items-center justify-around gap-5 w-[100%]">
        <div className="flex flex-col items-center justify-center gap-2">
          <FaUserGroup className="text-4xl text-[#ED0404] lg:text-6xl" />
          <h2 className="font-bold text-center">{donors.length} জন দাতা</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <FaLocationDot className="text-4xl text-[#ED0404] lg:text-6xl" />
          <h2 className="font-bold text-center">৬৪ টি জেলা</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <FaBoxes className="text-4xl text-[#ED0404] lg:text-6xl" />
          <h2 className="font-bold text-center">৮ টি ব্লাড গ্রুপ</h2>
        </div>
      </div>
    </section>
  );
};

export default OurOverview;
