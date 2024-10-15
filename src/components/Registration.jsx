import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
import Select from "react-select"; // Import react-select
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const Registration = () => {
  const [errors, setErrors] = useState("");
  const [showValues, setShowValues] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
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
    password: "",
    confirmPassword: "",
  });
  const [searchInputes, setSearchInputes] = useState({
    bloodGroup: "",
    district: "",
    upazilla: "",
  });

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
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const womenNumberRef = useRef(null);
  const emailRef = useRef(null);
  const bloodGroupRef = useRef(null);
  const lastDonationDateRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const districtRef = useRef(null);
  const upazillaRef = useRef(null);
  const addressRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      mobile,
      womenNumber,
      email,
      lastDonationDate,
      gender,
      dob,
      password,
    } = donorRegistrationDetails;
    const { address } = donorRegistrationDetails.presentAddress;
    const { bloodGroup, district, upazilla } = searchInputes;
    let validationErrors = {};
    let firstError = null;

    if (!donorRegistrationDetails.name.trim()) {
      validationErrors.name = "আপনার নাম লিখুন";
      firstError = firstError || nameRef;
    }
    if (!donorRegistrationDetails.mobile.trim()) {
      validationErrors.mobile = "মোবাইল নাম্বার লিখুন";
      firstError = firstError || mobileRef;
    } else if (
      donorRegistrationDetails.mobile.length < 11 ||
      donorRegistrationDetails.mobile.length > 11
    ) {
      validationErrors.mobile = "সঠিক নাম্বার লিখুন";
      firstError = firstError || mobileRef;
    }
    if (
      donorRegistrationDetails.gender == "নারী" &&
      !donorRegistrationDetails.womenNumber.trim()
    ) {
      validationErrors.womenNumber = "মোবাইল নাম্বার লিখুন";
      firstError = firstError || womenNumberRef;
    } else if (
      (donorRegistrationDetails.gender == "নারী" &&
        donorRegistrationDetails.womenNumber.length < 11) ||
      donorRegistrationDetails.womenNumber.length > 11
    ) {
      validationErrors.womenNumber = "সঠিক নাম্বার লিখুন";
      firstError = firstError || womenNumberRef;
    }
    if (
      donorRegistrationDetails.email &&
      !/\S+@\S+\.\S+/.test(donorRegistrationDetails.email)
    ) {
      validationErrors.email = "সঠিক ইমেইল লিখুন";
      firstError = firstError || emailRef;
    }
    if (!searchInputes.bloodGroup.trim()) {
      validationErrors.bloodGroup = "ব্লাড গ্রুপ সিলেক্ট করুন";
      firstError = firstError || bloodGroupRef;
    }
    if (!donorRegistrationDetails.lastDonationDate.trim()) {
      validationErrors.lastDonationDate =
        "সর্বশেষ রক্ত দানের তারিখ সিলেক্ট করুন";
      firstError = firstError || lastDonationDateRef;
    }
    if (!donorRegistrationDetails.gender.trim()) {
      validationErrors.gender = "জেন্ডার সিলেক্ট করুন";
      firstError = firstError || genderRef;
    }
    if (!donorRegistrationDetails.dob.trim()) {
      validationErrors.dob = "জন্ম তারিখ সিলেক্ট করুন";
      firstError = firstError || dobRef;
    }
    if (!searchInputes.district) {
      validationErrors.district = "জেলা সিলেক্ট করুন";
      firstError = firstError || districtRef;
    }
    if (!searchInputes.upazilla) {
      validationErrors.upazilla = "উপজেলা সিলেক্ট করুন";
      firstError = firstError || upazillaRef;
    }
    if (!donorRegistrationDetails.presentAddress.address) {
      validationErrors.address = "ঠিকানা লিখুন";
      firstError = firstError || addressRef;
    }
    if (!donorRegistrationDetails.password.trim()) {
      validationErrors.password = "পাসওয়ার্ড লিখুন";
      firstError = firstError || passwordRef;
    } else if (/\s/.test(donorRegistrationDetails.password)) {
      validationErrors.password = "পাসওয়ার্ডে কোনো স্পেস ব্যবহার করা যাবে না";
      firstError = firstError || passwordRef;
    } else if (donorRegistrationDetails.password.length < 8) {
      validationErrors.password = "পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিট হতে হবে";
      firstError = firstError || passwordRef;
    }
    if (!donorRegistrationDetails.confirmPassword.trim()) {
      validationErrors.confirmPassword = "কনফার্ম পাসওয়ার্ড লিখুন";
      firstError = firstError || confirmPasswordRef;
    } else if (/\s/.test(donorRegistrationDetails.confirmPassword)) {
      validationErrors.confirmPassword =
        "পাসওয়ার্ডে কোনো স্পেস ব্যবহার করা যাবে না";
      firstError = firstError || confirmPasswordRef;
    } else if (donorRegistrationDetails.confirmPassword.length < 8) {
      validationErrors.confirmPassword = "পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিট হতে হবে";
      firstError = firstError || confirmPasswordRef;
    } else if (
      donorRegistrationDetails.password !==
      donorRegistrationDetails.confirmPassword
    ) {
      validationErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
      firstError = firstError || confirmPasswordRef;
    }

    setErrors(validationErrors);

    // Scroll to the first error
    if (firstError) {
      const yOffset = -150; // Adjust this value to control the space on top
      const yPosition =
        firstError.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }

    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/donorsData`, {
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
            password,
            presentAddress: {
              district,
              upazilla,
              address,
            },
          }),
        });

        const data = await res.json();
        if (data.mobile) {
          navigate(`/profile-photo/${data.mobile}`);
        } else {
          setShowValues(data.msg);
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: for smooth scrolling
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
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
  //

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
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="container mx-auto p-3">
      <div className="h-full flex justify-center items-center">
        <div className="w-[100%] sm:w-[80%] md:w-[70%] lg:w-[50%]  flex flex-col items-center justify-center gap-3 rounded-md overflow-hidden shadow-md">
          <h1 className="bg-[#ED0404] w-[100%] text-center text-white font-bold text-2xl h-[60px] flex items-center justify-center">
            রক্তদাতা রেজিস্ট্রেশন
          </h1>
          <form action="" className="w-[100%]" onSubmit={handleSubmit}>
            <div className=" w-[100%] min-h-[300px] py-2 px-5 flex flex-col justify-center">
              {showValues && donorRegistrationDetails.gender === "পুরুষ" ? (
                <div className="w-full text-sm h-[50px] pl-2 flex items-center my-3 border-l-4 border-maincolor  bg-red-200">
                  <p>
                    {showValues}
                    <Link
                      to={"/login"}
                      className="text-sm font-bold text-maincolor"
                    >
                      লগইন
                    </Link>
                  </p>
                </div>
              ) : (
                ""
              )}
              {showValues && donorRegistrationDetails.gender === "নারী" ? (
                <div className="w-full text-sm h-[50px] pl-2 flex items-center my-3 border-l-4 border-maincolor  bg-red-200">
                  <p>
                    {
                      "আপনার দেয়া ফেইক নাম্বার দিয়ে ইতোমধ্যে একটি একাউন্ট খোলা আছে। অনুগ্রহ করে  অন্য নাম্বার ব্যবহার করুন"
                    }
                  </p>
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
                      value={"পুরুষ"}
                      ref={genderRef}
                      name="gender"
                      onChange={handledonorRegistrationDetails}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="নারী">নারী</label>
                    <input
                      type="radio"
                      ref={genderRef}
                      className="border border-slate-300  py-2 px-2 focus:border-[#ED0404] outline-none text-sm bg-slate-300 h-2 w-2 rounded-full appearance-none checked:bg-[#ED0404] checked:w-2 checked:h-2 checked:rounded-full"
                      value={"নারী"}
                      name="gender"
                      onChange={handledonorRegistrationDetails}
                    />
                  </div>
                </div>
                {errors.gender ? (
                  <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                    <RiAlertLine className="text-sm" />
                    {errors.gender}
                  </span>
                ) : (
                  ""
                )}
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
                  ref={nameRef}
                  name="name"
                  onChange={handledonorRegistrationDetails}
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
                  ref={mobileRef}
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="মোবাইল নাম্বার"
                  name="mobile"
                  onChange={handledonorRegistrationDetails}
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
                      আপনি যদি নারী রক্তদাতা হয়ে থাকেন তবে এই বক্সে একটি ফেইক
                      নাম্বার লিখুন।
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
                    ref={womenNumberRef}
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="সঠিক মোবাইল নাম্বার"
                    name="womenNumber"
                    onChange={handledonorRegistrationDetails}
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
                      আপনি যদি নারী রক্তদাতা হয়ে থাকেন তবে এই বক্সে সঠিক নাম্বার
                      ব্যাবহার করুন।এই নাম্বারটি শুধু এডমিন প্যানেল দেখতে পারবে।
                      কেউ নারী রক্তদাতার সাথে সরাসরি যোগাযোগ করতে পারবে না।কারো
                      রক্তের প্রয়োজন হলে আমরা যাচাই করে আপনার অনুমতি সাপেক্ষে
                      তাদের সাথে নাম্বার শেয়ার করবো।
                    </span>
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col mb-5">
                <label htmlFor="ইমেইল" className="text-md mb-2">
                  ইমেইল (যদি থাকে)
                </label>
                <input
                  type="text"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="ইমেইল"
                  ref={emailRef}
                  name="email"
                  onChange={handledonorRegistrationDetails}
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
                <Select
                  options={bloodGroupOptions}
                  ref={bloodGroupRef}
                  placeholder="রক্তের গ্রুপ সিলেক্ট করুন"
                  styles={customStyles}
                  onChange={(selectedOption) =>
                    handleChange("bloodGroup", selectedOption.value)
                  }
                />
                {/* <select
                  name="bloodGroup"
                  type="text"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  onChange={handledonorRegistrationDetails}
                >
                  <option value="রক্তের গ্রুপ সিলেক্ট করুন">
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
                </select> */}
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
                  ref={lastDonationDateRef}
                  max={today}
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="সর্বশেষ রক্ত দানের তারিখ"
                  onChange={handledonorRegistrationDetails}
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
                    ref={districtRef}
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
                    <option value="জেলা সিলেক্ট করুন">জেলা সিলেক্ট করুন</option>
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
                    ref={upazillaRef}
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
                    <option value="উপজেলা সিলেক্ট করুন">
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
                    ref={addressRef}
                    name="address"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="ঠিকানা"
                    onChange={handledonorRegistrationDetails2}
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
                  ref={dobRef}
                  max={"2006-12-31"}
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="জন্ম তারিখ"
                  onChange={handledonorRegistrationDetails}
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
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="পাসওয়ার্ড"
                  className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                >
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="পাসওয়ার্ড"
                  onChange={handledonorRegistrationDetails}
                />
                {errors.password ? (
                  <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                    <RiAlertLine className="text-sm" />
                    {errors.password}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="কনফার্ম পাসওয়ার্ড"
                  className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                >
                  কনফার্ম পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  ref={confirmPasswordRef}
                  name="confirmPassword"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="কনফার্ম পাসওয়ার্ড"
                  onChange={handledonorRegistrationDetails}
                />
                {errors.confirmPassword ? (
                  <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                    <RiAlertLine className="text-sm" />
                    {errors.confirmPassword}
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
                  রেজিস্ট্রেশন
                </button>
              </div>
            </div>
          </form>
          <div className="bg-[#FFF2F2] px-5 py-5">
            <h1 className="text-center text-xl font-bold pb-3 mb-3 text-[#ED0404] border-b-2 border-dashed border-[#ED0404]">
              পাসওয়ার্ড ভুলে গেলে যোগাযোগ করুন:
            </h1>
            <div className="flex flex-col gap-3 text-sm text-justify">
              <p>১.রোগীর ব্যাপারে বিস্তারিত জেনে নিশ্চিত হয়ে রক্ত লিখুন</p>
              <p>
                ২.প্রতিবার রক্তদানের পর করে তারিখ পরিবর্তন করে লিখুন বা যোগাযোগ
                করুন
              </p>
              <p>
                ৩.রোগি দেখে রক্তদান করুন। অবশ্যই রোগির নিকট উপস্থিত রোগির
                আত্মীয়ের সাথে কথা বলে জানিয়ে লিখুন যে আপনি স্বেচ্ছায় এবং
                বিনামূল্যে রক্তদান করছেন। যাতে দালাল, আত্মীয় সেজে কিংবা তৃতীয়
                পক্ষের কেউ দুর্নীতি করতে না পারে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
