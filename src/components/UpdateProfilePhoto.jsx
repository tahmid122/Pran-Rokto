import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileNav from "./ProfileNav";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
const apiUrl = import.meta.env.VITE_API_URL;
const UpdateProfilePhoto = () => {
  const [errors, setErrors] = useState("");
  const { setIsLoading } = useLoading();
  const { number } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [image, setimage] = useState(null);
  const [file, setFile] = useState();
  const [donorDetails, setDonorDetails] = useState(null);
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
  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const getDonorDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/donor/${number}`, {
        method: "GET",
      });
      const data = await res.json();
      setDonorDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const validationErrors = {};

    if (!image) {
      validationErrors.image = "ছবি সিলেক্ট করুন";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/donor/update/photo/${number}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.image) {
          navigate(`/profile/${data.mobile}`);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getDonorDetails();
  }, []);
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
          <form onSubmit={handleSubmit} className="w-[100%] lg:w-[80%] mx-auto">
            <div className=" w-[100%] min-h-[300px] py-2 px-5 flex flex-col justify-center lg:items-center">
              {donorDetails ? (
                <div className="flex items-center justify-center mb-5 gap-5 flex-col sm:flex-row">
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
                  {file ? (
                    <div className="flex items-center gap-2 justify-center text-sm">
                      <span>পরিবর্তনের পর</span>
                      <span>
                        <FaArrowRightLong />
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {file ? (
                    <img
                      src={file}
                      alt={file}
                      className="h-[150px] w-[150px] rounded-full object-cover lg:w-[200px] lg:h-[200px]"
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col mb-5 lg:w-[50%]">
                <label htmlFor="চেঞ্জ ফটো" className="text-md mb-2">
                  ফটো সিলেক্ট করুন
                </label>
                <input
                  type="file"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png, image/gif,image/jpeg"
                />
                {errors.image ? (
                  <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                    <RiAlertLine className="text-sm" />
                    {errors.image}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-center  w-[100%] h-[100%] text-center">
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
      </div>
    </section>
  );
};

export default UpdateProfilePhoto;
