import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useLoading } from "./LoadingContexts";
const apiUrl = import.meta.env.VITE_API_URL;
const Donors = () => {
  const { setIsLoading } = useLoading();
  const location = useLocation();
  const searchResults = location.state?.searchResults;
  const [donors, setDonors] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [dinedx, setDindex] = useState();

  const getDonors = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/all-donors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDonors(data.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Move getDistrict function outside of the map
  const getDistrict = async (districtNumber) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/getDistrict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          districtNumber,
        }),
      });
      const data = await res.json();
      return data[0]?.bn_name || ""; // Safely return district name or empty string
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setDonors(searchResults);
    } else {
      getDonors();
    }
  }, []);

  // Use another useEffect to fetch district name
  useEffect(() => {
    // Loop through the donors to fetch district names asynchronously
    donors.forEach(async (donor) => {
      if (donor.presentAddress?.district) {
        const districtName = await getDistrict(donor.presentAddress.district);
        setDistrictName((prev) => ({
          ...prev,
          [donor.mobile]: districtName, // Store district name using mobile as key
        }));
      }
    });
  }, [donors]);

  return (
    <section className="container mx-auto p-3 min-h-screen">
      {searchResults && searchResults.length === 0 ? (
        <h1 className="font-bold text-sm border-l-8 border-maincolor text-maincolor pl-2 h-[30px] flex items-center mb-5">
          আপনার কাঙ্খিত কোনো রক্তদাতা পাওয়া যায়নি
        </h1>
      ) : (
        ""
      )}
      <h1 className="font-bold text-sm border-l-8 border-[#ED0404] pl-2 h-[30px] flex items-center mb-5">
        {searchResults && searchResults.length > 0
          ? `${searchResults[0].bloodGroup} গ্রুপের ${
              districtName[searchResults[0].mobile]
            } জেলার ${searchResults.map((upazilla, index) => {
              return upazilla.presentAddress.upazilla;
            })} উপজেলার `
          : "সকল গ্রুপের "}
        রক্তদাতাসমূহ ({donors.length} জন)
      </h1>
      <div className="w-[100%] px-0 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {donors.length > 0
          ? donors.map((donor, index) => {
              const {
                name,
                image,
                bloodGroup,
                lastDonationDate,
                mobile,
                note,
                gender,
              } = donor;

              const formatedDate = new Date(lastDonationDate)
                .toISOString()
                .split("T")[0];
              const formatedDates = new Date(formatedDate);
              const today = new Date();
              const timeDiff = today.getTime() - formatedDates.getTime();
              const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

              return (
                <div
                  className="w-full sm:w-[80%] mx-auto lg:w-full shadow-lg pt-1 pb-3 flex flex-col items-center justify-center h-[380px] relative border-t-2 border-[#ED0404] rounded-sm"
                  key={index}
                >
                  <div className="flex justify-end items-center w-full">
                    <button
                      onClick={() => setDindex(index)}
                      className="text-sm font-medium flex justify-center items-center gap-1 cursor-pointer w-[100px] hover:text-[#ED0404] transition-all duration-300"
                    >
                      নোট দেখুন <IoMdEye className="text-lg" />
                    </button>
                  </div>
                  <img
                    src={
                      image
                        ? image
                        : gender === "পুরুষ"
                        ? "/public/men.jpg"
                        : "/public/women.jpg"
                    }
                    alt={name}
                    className="w-[200px] h-[150px] object-cover rounded-md"
                  />
                  <div className="mt-2 w-full text-center flex flex-col gap-1">
                    <h1
                      className={`font-bold text-xl ${
                        dayDiff < 120 ? "line-through" : ""
                      }`}
                    >
                      {name}
                    </h1>
                    <p className="text-sm font-medium">
                      রক্তের গ্রুপ: {bloodGroup}
                    </p>
                    <p className="text-sm font-medium">
                      সর্বশেষ: {formatedDate} ({dayDiff} দিন আগে)
                    </p>
                    <p className="text-sm font-medium flex items-center justify-center gap-2">
                      <span>
                        জেলা: {districtName[mobile] || "লোড হচ্ছে..."}
                      </span>
                      <span>উপজেলা: {donor.presentAddress.upazilla}</span>
                    </p>
                    {dayDiff > 120 ? (
                      <p className="text-sm font-medium text-green-700">
                        রক্তদানের সময় হয়েছে
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-maincolor">
                        রক্তদানের সময় হয় নি
                      </p>
                    )}

                    <hr className="mt-2" />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Link
                      to={`/donors/${mobile}`}
                      className="bg-[#ED0404] px-2 py-2 text-sm text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                    >
                      প্রোফাইল দেখুন
                    </Link>
                    {gender === "নারী" ? (
                      <Link
                        to={"/contact-women-donor"}
                        className="bg-[#ED0404] px-2 py-2 text-sm text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404] cursor-pointer"
                      >
                        কল করুন
                      </Link>
                    ) : (
                      <a
                        href={`tel:+88${mobile}`}
                        className="bg-[#ED0404] px-2 py-2 text-sm text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404] cursor-pointer"
                      >
                        কল করুন
                      </a>
                    )}
                  </div>
                  {dinedx === index && (
                    <div className="absolute w-[70%] h-[70%] bg-gray-100 p-2 text-sm">
                      <p className="mt-5">{note ? note : "কোনো নোট নেই"}</p>
                      <FaXmark
                        onClick={() => {
                          setDindex(-1);
                        }}
                        className="absolute right-1 top-1 text-lg cursor-pointer hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                      />
                    </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
    </section>
  );
};

export default Donors;
