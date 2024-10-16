import React, { useEffect, useState } from "react";
import { useLoading } from "./LoadingContexts";
import { useNavigate, useParams } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
const apiUrl = import.meta.env.VITE_API_URL;
const ProfilePhoto = () => {
  const { setIsLoading } = useLoading();
  const { number } = useParams();
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [file, setFile] = useState();
  const [donorDetails, setDonorDetails] = useState(null);

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

    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/donor/update/photo/${number}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.image) {
        navigate(`/login`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDonorDetails();
  }, []);
  return (
    <section className="container, mx-auto p-3 flex items-center justify-center min-h-screen">
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
                      ? "/men.jpg"
                      : "/women.jpg"
                  }
                  alt={
                    donorDetails.image
                      ? donorDetails.image
                      : donorDetails.gender == "পুরুষ"
                      ? "/men.jpg"
                      : "/women.jpg"
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
              />
            </div>
            <div className="flex items-center justify-center  w-[100%] h-[100%] text-center gap-2">
              <button
                className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                type="submit"
              >
                আপডেট করুন
              </button>
              <button
                className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                type="submit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                স্কিপ করুন
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePhoto;
