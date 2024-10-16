import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
const apiUrl = import.meta.env.VITE_API_URL;
const ChangePassword = () => {
  const [errors, setErrors] = useState("");
  const [showValues, setShowValues] = useState("");
  const { setIsLoading } = useLoading();
  const { number } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [passDetails, setPassDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handlepassDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassDetails({ ...passDetails, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };
  //verify user
  const getVerified = async () => {
    try {
      const res = await fetch("http://localhost:3000/profile", {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = passDetails;

    let validationErrors = {};

    if (!passDetails.oldPassword.trim()) {
      validationErrors.oldPassword = "পুরোনো পাসওয়ার্ড লিখুন";
    } else if (/\s/.test(passDetails.oldPassword)) {
      validationErrors.oldPassword =
        "পাসওয়ার্ডে কোনো স্পেস ব্যবহার করা যাবে না";
    } else if (passDetails.oldPassword.length < 8) {
      validationErrors.password = "পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিট হতে হবে";
    }

    if (!passDetails.newPassword.trim()) {
      validationErrors.newPassword = "নতুন পাসওয়ার্ড লিখুন";
    } else if (/\s/.test(passDetails.newPassword)) {
      validationErrors.newPassword =
        "পাসওয়ার্ডে কোনো স্পেস ব্যবহার করা যাবে না";
    } else if (passDetails.newPassword.length < 8) {
      validationErrors.newPassword = "পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিট হতে হবে";
    }
    if (!passDetails.confirmNewPassword.trim()) {
      validationErrors.confirmNewPassword = "কনফার্ম নতুন পাসওয়ার্ড লিখুন";
    } else if (/\s/.test(passDetails.confirmNewPassword)) {
      validationErrors.confirmNewPassword =
        "পাসওয়ার্ডে কোনো স্পেস ব্যবহার করা যাবে না";
    } else if (passDetails.confirmNewPassword.length < 8) {
      validationErrors.confirmNewPassword =
        "পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিট হতে হবে";
    } else if (passDetails.newPassword !== passDetails.confirmNewPassword) {
      validationErrors.confirmNewPassword = "পাসওয়ার্ড মিলছে না";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/change-password/${number}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        });
        const data = await res.json();
        if (data.msg === "Successfully Changed the password") {
          alert("পাসওয়ার্ড সফল্ভাবে পরিবর্তন হয়েছে");
          localStorage.removeItem("mobile");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setShowValues("পুরোনো পাসওয়ার্ড ভুল দিয়েছেন !");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getVerified();
  }, []);
  return (
    <section className="container mx-auto p-3 min-h-[80vh] flex items-center justify-center w-full">
      <div className="w-full flex flex-col items-start gap-10 justify-center lg:flex-row">
        <div className="w-[30%] relative">
          <ProfileNav />
        </div>
        <div className="w-[100%]">
          <div className="w-[100%] flex flex-col items-center justify-center gap-5 p-3 shadow-md rounded-sm border-t-4 border-[#ED0404]">
            <h1 className="text-[#ED0404] font-bold text-xl border-b-2 border-[#ED0404] border-dashed pb-2 w-full text-center">
              পাসওয়ার্ড পরিবর্তন করুন:
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center flex-col"
            >
              <div className="w-full flex flex-col items-center justify-center gap-3 mt-3 lg:w-[50%]">
                {showValues ? (
                  <div className="w-full text-sm h-[50px] pl-2 flex items-center my-3 border-l-4 border-maincolor  bg-red-200">
                    <p>{showValues}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col mb-5 w-full">
                  <label
                    htmlFor="পুরোনো পাসওয়ার্ড"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    পুরোনো পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="পুরোনো পাসওয়ার্ড"
                    name="oldPassword"
                    onChange={handlepassDetails}
                  />
                  {errors.oldPassword ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.oldPassword}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mb-5 w-full">
                  <label
                    htmlFor="নতুন পাসওয়ার্ড"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    নতুন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="নতুন পাসওয়ার্ড"
                    onChange={handlepassDetails}
                    name="newPassword"
                  />
                  {errors.newPassword ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.newPassword}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mb-5 w-full">
                  <label
                    htmlFor="কনফার্ম নতুন পাসওয়ার্ড"
                    className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
                  >
                    কনফার্ম নতুন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                    placeholder="চেঞ্জ পাসওয়ার্ড"
                    name="confirmNewPassword"
                    onChange={handlepassDetails}
                  />
                  {errors.confirmNewPassword ? (
                    <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                      <RiAlertLine className="text-sm" />
                      {errors.confirmNewPassword}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center  w-[100%] h-[100%]">
                <button
                  className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                  type="submit"
                >
                  আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
