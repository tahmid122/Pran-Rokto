import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
const apiUrl = import.meta.env.VITE_API_URL;
const Login = () => {
  const [errors, setErrors] = useState("");
  const [wrongInfo, setWrongInfo] = useState("");
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    mobile: "",
    password: "",
  });
  const getLoginDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();
    setLoginDetails({ ...loginDetails, [name]: value });
    // Dynamically clear error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mobile, password } = loginDetails;
    let validationErrors = {};
    if (!loginDetails.mobile.trim()) {
      validationErrors.mobile = "মোবাইল নাম্বার দিন";
    } else if (
      loginDetails.mobile.length < 11 ||
      loginDetails.mobile.length > 11
    ) {
      validationErrors.mobile = "সঠিক নাম্বার দিন";
    }
    if (!loginDetails.password.trim()) {
      validationErrors.password = "পাসওয়ার্ড দিন";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            password,
          }),
        });
        const data = await res.json();
        if (data.mobile) {
          localStorage.setItem("mobile", data.mobile);
          localStorage.setItem("token", data.token);
          navigate(`/profile/${data.mobile}`);
          // window.location.reload();
        } else {
          setWrongInfo("মোবাইল অথবা পাসওয়ার্ড ভুল দিয়েছেন !");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <section
      className="container mx-auto p-5 h-[90vh]
    "
    >
      <div className="h-full flex justify-center items-center">
        <div className="w-[100%] sm:w-[80%] md:w-[70%] lg:w-[500px]  flex flex-col items-center justify-center gap-3 rounded-md overflow-hidden shadow-md">
          <h1 className="bg-[#ED0404] w-[100%] text-center text-white font-bold text-2xl h-[60px] flex items-center justify-center ">
            রক্তদাতা লগইন
          </h1>
          <form className="w-[100%]" onSubmit={handleSubmit}>
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
                {errors.mobile ? (
                  <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                    <RiAlertLine className="text-sm" />
                    {errors.mobile}
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
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  placeholder="পাসওয়ার্ড"
                  name="password"
                  onChange={getLoginDetails}
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
              {wrongInfo ? (
                <span className="mb-4 text-sm font-bold text-maincolor">
                  {wrongInfo}
                </span>
              ) : (
                ""
              )}
              <div className="flex items-center justify-between  w-[100%] h-[100%] mb-5">
                <button
                  className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                  type="submit"
                >
                  লগইন
                </button>

                <Link
                  to={"/forget-password"}
                  className="block text-xs hover:text-maincolor"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
