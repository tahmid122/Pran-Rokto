import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
// import { FaFacebook, FaWhatsapp, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;
const Profile = () => {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const { number } = useParams();
  const [dayDifference, setDayDifference] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [donorDetails, setDonorDetails] = useState(null);
  const token = localStorage.getItem("token");
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
      }
      if (data.dob) {
        const formattedLastDob = new Date(data.dob).toISOString().split("T")[0];
        data.dob = formattedLastDob;
        //
        const formatedDate = new Date(data.lastDonationDate)
          .toISOString()
          .split("T")[0];
        const formatedDates = new Date(formatedDate);
        const today = new Date();
        const timeDiff = today.getTime() - formatedDates.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDayDifference(dayDiff);
      }
      setDonorDetails(data);
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
  //verify user
  const getVerified = async () => {
    try {
      const res = await fetch(`${apiUrl}/profile`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 401) {
        // Check if the token is invalid or unauthorized
        localStorage.removeItem("mobile");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);
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
    <section className="container mx-auto p-3 min-h-[80vh] flex items-center justify-center w-full">
      <div className="w-full flex flex-col items-start gap-10 justify-center lg:flex-row">
        <div className="w-[30%] relative">
          <ProfileNav />
        </div>
        {donorDetails ? (
          <div className="w-[100%] flex items-center justify-center">
            <div className="w-[100%] flex flex-col items-center justify-center gap-3 p-3 shadow-md rounded-sm border-t-4 border-[#ED0404] lg:w-[70%] lg:flex-row lg:justify-center lg:gap-14 lg:h-[400px]">
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
                        <a href={`tel:${donorDetails.womenNumber}`}>
                          {donorDetails.womenNumber}
                        </a>
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
                        (<span className="font-bold">{dayDifference} </span>দিন
                        আগে)
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="font-bold mr-2">জন্ম তারিখঃ</span>
                    <span>{donorDetails.dob}</span>
                  </li>
                  <li>
                    <span className="font-bold mr-2">জেন্ডারঃ</span>
                    <span>{donorDetails.gender}</span>
                  </li>
                  <li>
                    <span className="font-bold mr-2">বর্তমান ঠিকানাঃ</span>
                    <span>{donorDetails.presentAddress.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>
                      <span className="font-bold">জেলাঃ</span> {districtName}
                    </span>
                    <span>
                      <span className="font-bold">উপজেলাঃ</span>{" "}
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
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Profile;
