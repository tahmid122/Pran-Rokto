import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const DonorDetails = () => {
  const { setIsLoading } = useLoading();
  const { number } = useParams();
  const [districtName, setDistrictName] = useState("");
  const [donorDetails, setDonorDetails] = useState();
  const [dayDifference, setDayDifference] = useState("");
  const getDonorDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/donor/${number}`, {
        method: "GET",
      });
      const data = await res.json();
      // Convert the lastDonationDate to 'YYYY-MM-DD' format
      if (data.lastDonationDate) {
        const formattedLastDonationDate = new Date(data.lastDonationDate)
          .toISOString()
          .split("T")[0];
        data.lastDonationDate = formattedLastDonationDate;
        //
        const formatedDates = new Date(formattedLastDonationDate);
        const today = new Date();
        const timeDiff = today.getTime() - formatedDates.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDayDifference(dayDiff);
      }
      if (data.dob) {
        const formattedLastDonationDate = new Date(data.dob)
          .toISOString()
          .split("T")[0];
        data.dob = formattedLastDonationDate;
      }
      setDonorDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //
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
  // Use another useEffect to fetch district name
  useEffect(() => {
    // Fetch district name when donorDetails is available
    if (donorDetails?.presentAddress?.district) {
      const fetchDistrictName = async () => {
        const name = await getDistrict(donorDetails.presentAddress.district);
        setDistrictName(name);
      };
      fetchDistrictName();
    }
  }, [donorDetails]);
  useEffect(() => {
    getDonorDetails();
  }, []);
  return (
    <section className="container mx-auto p-3 flex items-center justify-center min-h-[80vh]">
      {donorDetails && (
        <div className="w-[95%] flex flex-col items-center justify-center gap-3 p-3 shadow-md rounded-sm border-t-4 border-[#ED0404] lg:w-[50%] lg:flex-row lg:justify-center lg:gap-14 lg:h-[400px]">
          <img
            src={
              donorDetails.image
                ? donorDetails.image
                : donorDetails.gender == "পুরুষ"
                ? "/public/men.jpg"
                : "/public/women.jpg"
            }
            alt={
              donorDetails.image
                ? donorDetails.image
                : donorDetails.gender == "পুরুষ"
                ? "/public/men.jpg"
                : "/public/women.jpg"
            }
            className="h-[150px] w-[150px] rounded-full object-cover lg:w-[200px] lg:h-[200px]"
          />
          <div>
            <h1 className="font-bold text-xl">{donorDetails.name}</h1>
            <ul className="flex flex-col gap-2 text-[15px] mt-2">
              <li>
                <span className="font-bold mr-2">মোবাইলঃ</span>
                <span>
                  {donorDetails.gender == "নারী" ? (
                    <div className="inline">
                      <Link
                        to={"/contact-women-donor"}
                        className="line-through"
                        title="ফেইক নাম্বার"
                      >
                        {donorDetails.mobile}
                      </Link>
                      <span> (এটি ভুল নাম্বার)</span>
                    </div>
                  ) : (
                    <a href={`tel:+88${donorDetails.mobile}`}>
                      {donorDetails.mobile}
                    </a>
                  )}
                </span>
              </li>
              <li>
                <span className="font-bold mr-2">রক্তের গ্রুপঃ</span>
                <span>{donorDetails.bloodGroup}</span>
              </li>
              <li>
                <span className="font-bold mr-2">সর্বশেষ রক্তদানঃ</span>
                <span>
                  {donorDetails.lastDonationDate}{" "}
                  <span>
                    (<span className="font-bold">{dayDifference} </span>দিন আগে)
                  </span>
                </span>
              </li>
              <li>
                <span className="font-bold mr-2">জেন্ডারঃ</span>
                <span>{donorDetails.gender}</span>
              </li>
              <li>
                <span className="font-bold mr-2">বর্তমান ঠিকানাঃ</span>
                <span>{donorDetails.presentAddress.address}</span>
              </li>
              <li className="flex items-center justify-start gap-2">
                <span>
                  <span className="font-bold mr-1">জেলা:</span>{" "}
                  {districtName || "লোড হচ্ছে..."}
                </span>
                <span>
                  <span className="font-bold mr-1">উপজেলা:</span>{" "}
                  {donorDetails.presentAddress.upazilla}
                </span>
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
      )}
    </section>
  );
};

export default DonorDetails;
