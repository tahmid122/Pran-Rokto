import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
import Select from "react-select"; // Import react-select
const apiUrl = import.meta.env.VITE_API_URL;
const UpdateProfile = () => {
  const [errors, setErrors] = useState("");
  const { number } = useParams();
  const navigate = useNavigate();
  const [showValues, setShowValues] = useState("");
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoading();
  const [donorDetails, setDonorDetails] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [donorRegistrationDetails, setDonorRegistrationDetails] = useState({
    name: "",
    mobile: "",
    womenNumber: "",
    email: "",
    bloodGroup: "",
    lastDonationDate: "",
    presentAddress: {
      district: "",
      upazilla: "",
      address: "",
    },
    gender: "",
    dob: "",
  });
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
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
        const formattedLastDonationDate = new Date(data.dob)
          .toISOString()
          .split("T")[0];
        data.dob = formattedLastDonationDate;
      }

      setDonorDetails(data);
      setDonorRegistrationDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //
  const handledonorRegistrationDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDonorRegistrationDetails({ ...donorRegistrationDetails, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };
  const handledonorRegistrationDetails2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    donorRegistrationDetails.presentAddress = {
      ...donorRegistrationDetails.presentAddress,
      [name]: value,
    };
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };
  //
  const [searchInputes, setSearchInputes] = useState({
    district: "",
    upazilla: "",
  });
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      mobile,
      womenNumber,
      email,
      bloodGroup,
      lastDonationDate,
      gender,
      dob,
    } = donorRegistrationDetails;
    const { address } = donorRegistrationDetails.presentAddress;
    const { district, upazilla } = searchInputes;
    let validationErrors = {};
    if (!donorRegistrationDetails.name.trim()) {
      validationErrors.name = "নাম লিখুন";
    }
    if (!donorRegistrationDetails.mobile.trim()) {
      validationErrors.mobile = "মোবাইল নাম্বার লিখুন";
    } else if (
      donorRegistrationDetails.mobile.length < 11 ||
      donorRegistrationDetails.mobile.length > 11
    ) {
      validationErrors.mobile = "সঠিক নাম্বার লিখুন";
    }
    if (
      donorRegistrationDetails.email &&
      !/\S+@\S+\.\S+/.test(donorRegistrationDetails.email)
    ) {
      validationErrors.email = "সঠিক ইমেইল লিখুন";
    }
    if (!donorRegistrationDetails.bloodGroup) {
      validationErrors.bloodGroup = "ব্লাড গ্রুপ সিলেক্ট করুন";
    }
    if (!donorRegistrationDetails.lastDonationDate.trim()) {
      validationErrors.lastDonationDate =
        "সর্বশেষ রক্ত দানের তারিখ সিলেক্ট করুন";
    }
    if (!searchInputes.district) {
      validationErrors.district = "জেলা সিলেক্ট করুন";
    }
    if (!searchInputes.upazilla) {
      validationErrors.upazilla = "উপজেলা সিলেক্ট করুন";
    }
    if (!donorRegistrationDetails.presentAddress.address) {
      validationErrors.address = "ঠিকানা লিখুন";
    }
    if (!donorRegistrationDetails.dob.trim()) {
      validationErrors.dob = "জন্ম তারিখ সিলেক্ট করুন";
    }
    if (donorRegistrationDetails.gender == "নারী") {
      if (
        donorRegistrationDetails.gender == "নারী" &&
        !donorRegistrationDetails.womenNumber
      ) {
        validationErrors.womenNumber = "মোবাইল নাম্বার লিখুন";
      } else if (
        (donorRegistrationDetails.gender == "নারী" &&
          donorRegistrationDetails.womenNumber.length < 11) ||
        donorRegistrationDetails.womenNumber.length > 11
      ) {
        validationErrors.womenNumber = "সঠিক নাম্বার লিখুন";
      }
    }

    setErrors(validationErrors);
    const values = Object.values(validationErrors).join(", ");

    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/donor/update/${number}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobile,
            womenNumber,
            email,
            bloodGroup,
            lastDonationDate,
            gender,
            dob,
            presentAddress: {
              district,
              upazilla,
              address,
            },
          }),
        });
        const data = await res.json();
        if (data.mobile) {
          navigate(`/profile/${data.mobile}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowValues(values);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: for smooth scrolling
      });
    }
  };
  const handleChange = (name, value) => {
    setSearchInputes({ ...searchInputes, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };
  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "40px",
      boxShadow: "none",
      borderRadius: "0.375rem", // Adjust the border radius as needed
      fontSize: "14px",
      borderColor: state.isFocused ? "#ED0404" : provided.borderColor,
      "&:hover": {
        borderColor: "rgb(203 213 225)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 100,
      backgroundColor: "#ffffff",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ED0404" : "#ffffff",
      color: state.isFocused ? "#ffffff" : "#000000",
      "&:active": {
        backgroundColor: "#ED0404",
        color: "#ffffff",
        fontSize: "14px",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black", // Set color with opacity
      opacity: 1, // Change opacity (not necessary if using rgba)
      fontSize: "14px",
    }),
  };
  // Options for blood groups
  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  // Options for districts
  const districtOptions = districts
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((district) => ({
      value: district.id,
      label: `${district.bn_name} - ${district.name}`,
    }));

  // Options for upazillas
  const upazillaOptions = upazillas.map((upazilla) => ({
    value: upazilla.bn_name,
    label: `${upazilla.bn_name} - ${upazilla.name}`,
  }));
  //
  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/univercelData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDistricts(data[0].districts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getUpazillas = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/upazilla`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upazilla: id,
        }),
      });
      const data = await res.json();
      setUpazillas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);

  useEffect(() => {
    getData();
  }, []);

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
          <div className="w-[100%]">
            <form
              onSubmit={handleSubmit}
              className="w-[100%] lg:w-[80%] mx-auto"
            >
              <div className=" w-[100%] min-h-[300px] py-2 px-5 flex flex-col justify-center">
                <div className="flex flex-row items-center justify-center mb-5">
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
                </div>
                {showValues ? (
                  <div className="w-full text-sm h-[50px] pl-2 flex items-center my-3 border-l-4 border-maincolor  bg-red-200">
                    <p>{showValues}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="জেন্ডার"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    জেন্ডার
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label htmlFor="পুরুষ">পুরুষ</label>
                      <input
                        type="radio"
                        className="border border-slate-300  py-2 px-2 focus:border-[#ED0404] outline-none text-sm bg-slate-300 h-2 w-2 rounded-full appearance-none checked:bg-[#ED0404] checked:w-2 checked:h-2 checked:rounded-full"
                        value="পুরুষ"
                        name="gender"
                        onChange={handledonorRegistrationDetails}
                        checked={donorRegistrationDetails.gender === "পুরুষ"} // Check if the gender is "পুরুষ"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="নারী">নারী</label>
                      <input
                        type="radio"
                        className="border border-slate-300  py-2 px-2 focus:border-[#ED0404] outline-none text-sm bg-slate-300 h-2 w-2 rounded-full appearance-none checked:bg-[#ED0404] checked:w-2 checked:h-2 checked:rounded-full"
                        value="নারী"
                        name="gender"
                        onChange={handledonorRegistrationDetails}
                        checked={donorRegistrationDetails.gender === "নারী"} // Check if the gender is "নারী"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[#ED0404] pt-3">
                    নারী ডোনারদের মোবাইল নাম্বার গোপন রাখা হবে।
                  </p>
                </div>
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="নাম"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    নাম
                  </label>
                  <input
                    type="text"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="নাম"
                    name="name"
                    onChange={handledonorRegistrationDetails}
                    value={donorRegistrationDetails.name}
                  />
                  {errors.name ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.name}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="মোবাইল নাম্বার"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    মোবাইল নাম্বার (ইংরেজি)
                  </label>
                  <input
                    type="text"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="মোবাইল নাম্বার"
                    name="mobile"
                    disabled={donorDetails.gender === "নারী" ? true : false}
                    onChange={handledonorRegistrationDetails}
                    defaultValue={donorRegistrationDetails.mobile}
                  />
                  {errors.mobile ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.mobile}
                    </span>
                  ) : (
                    ""
                  )}
                  {donorRegistrationDetails.gender == "নারী" ? (
                    <p className="text-sm mt-2">
                      <b>নোটঃ </b>
                      <span className="text-sm text-maincolor">
                        আপনি যদি নারী রক্তদাতা হয়ে থাকেন তবে এই বক্সের নাম্বারটি
                        চেঞ্জ করতে পারবেন না। আপনি চাইলে আপনার আসল নাম্বার দিয়েও
                        লগইন করতে পারবেন।
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {donorRegistrationDetails.gender == "নারী" ? (
                  <div className="flex flex-col mb-5">
                    <label
                      htmlFor="মোবাইল নাম্বার"
                      className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                    >
                      সঠিক মোবাইল নাম্বার (ইংরেজি)
                    </label>
                    <input
                      type="text"
                      className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                      placeholder="সঠিক মোবাইল নাম্বার"
                      name="womenNumber"
                      onChange={handledonorRegistrationDetails}
                      defaultValue={donorRegistrationDetails.womenNumber}
                    />
                    {errors.womenNumber ? (
                      <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                        <RiAlertLine className="text-sm" />
                        {errors.womenNumber}
                      </span>
                    ) : (
                      ""
                    )}
                    <p className="text-sm mt-2">
                      <b>নোটঃ </b>
                      <span className="text-sm text-maincolor">
                        আপনি যদি নারী রক্তদাতা হয়ে থাকেন তবে এই বক্সে সঠিক
                        নাম্বার ব্যাবহার করুন।এই নাম্বারটি শুধু এডমিন প্যানেল
                        দেখতে পারবে। কেউ নারী রক্তদাতার সাথে সরাসরি যোগাযোগ করতে
                        পারবে না।কারো রক্তের প্রয়োজন হলে আমরা যাচাই করে আপনার
                        অনুমতি সাপেক্ষে তাদের সাথে নাম্বার শেয়ার করবো।
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="ইমেইল"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    ইমেইল (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="ইমেইল"
                    name="email"
                    onChange={handledonorRegistrationDetails}
                    defaultValue={donorRegistrationDetails.email}
                  />
                  {errors.email ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="রক্তের গ্রুপ"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    রক্তের গ্রুপ
                  </label>
                  <select
                    name="bloodGroup"
                    type="text"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    onChange={handledonorRegistrationDetails}
                    defaultValue={donorRegistrationDetails.bloodGroup}
                  >
                    <option value="রক্তের গ্রুপ সিলেক্ট করুন" disabled>
                      রক্তের গ্রুপ সিলেক্ট করুন
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                  {errors.bloodGroup ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.bloodGroup}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="সর্বশেষ রক্ত দানের তারিখ"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    সর্বশেষ রক্ত দানের তারিখ
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="সর্বশেষ রক্ত দানের তারিখ"
                    onChange={handledonorRegistrationDetails}
                    defaultValue={donorRegistrationDetails.lastDonationDate}
                  />
                  {errors.lastDonationDate ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.lastDonationDate}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="border border-dotted border-[#ED0404] p-3 mb-5 rounded-md mt-2">
                  <h1 className="text-[#ED0404] bg-white w-[150px] text-center mt-[-25px]">
                    বর্তমান ঠিকানা
                  </h1>
                  <div className="flex flex-col mb-5">
                    <label
                      htmlFor="জেলা"
                      className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                    >
                      জেলা
                    </label>
                    <Select
                      options={districtOptions}
                      placeholder="জেলা সিলেক্ট করুন"
                      className="text-sm"
                      styles={customStyles}
                      onChange={(selectedOption) => {
                        handleChange("district", selectedOption.value);
                        getUpazillas(selectedOption.value);
                      }}
                    />
                    {/* <select
                      name="district"
                      type="text"
                      className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                      onChange={(e) => {
                        handledonorRegistrationDetails2(e);
                        getUpazillas(e.target.value);
                      }}
                    >
                      <option value="জেলা সিলেক্ট করুন" disabled selected>
                        জেলা সিলেক্ট করুন
                      </option>
                      {districts &&
                        districts
                          .sort((a, b) => a.name.localeCompare(b.name)) // Sorting districts alphabetically by English name
                          .map((district, index) => {
                            return (
                              <option value={district.id} key={index}>
                                {district.bn_name}-{district.name}
                              </option>
                            );
                          })}
                    </select> */}
                    {errors.district ? (
                      <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                        <RiAlertLine className="text-sm" />
                        {errors.district}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <label
                      htmlFor="উপজেলা"
                      className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                    >
                      উপজেলা
                    </label>
                    <Select
                      options={upazillaOptions}
                      placeholder="উপজেলা সিলেক্ট করুন"
                      className="text-sm"
                      styles={customStyles}
                      onChange={(selectedOption) =>
                        handleChange("upazilla", selectedOption.value)
                      }
                    />
                    {/* <select
                      name="upazilla"
                      type="text"
                      className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                      onChange={handledonorRegistrationDetails2}
                    >
                      <option value="উপজেলা সিলেক্ট করুন" disabled selected>
                        উপজেলা সিলেক্ট করুন
                      </option>
                      {upazillas &&
                        upazillas.map((upazilla, index) => {
                          return (
                            <option value={upazilla.bn_name} key={index}>
                              {upazilla.bn_name}-{upazilla.name}
                            </option>
                          );
                        })}
                    </select> */}
                    {errors.upazilla ? (
                      <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                        <RiAlertLine className="text-sm" />
                        {errors.upazilla}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col mb-5">
                    <label
                      htmlFor="ঠিকানা"
                      className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                    >
                      ঠিকানা
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                      placeholder="ঠিকানা"
                      onChange={handledonorRegistrationDetails2}
                      defaultValue={
                        donorRegistrationDetails.presentAddress.address
                      }
                    />
                    {errors.address ? (
                      <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                        <RiAlertLine className="text-sm" />
                        {errors.address}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="জন্ম তারিখ"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    জন্ম তারিখ (গোপন থাকবে)
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="জন্ম তারিখ"
                    onChange={handledonorRegistrationDetails}
                    defaultValue={donorRegistrationDetails.dob}
                  />
                  {errors.dob ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.dob}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex items-center justify-between  w-[100%] h-[100%]">
                  <button
                    className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                    type="submit"
                  >
                    আপডেট করুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default UpdateProfile;
