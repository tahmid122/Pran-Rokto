import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
const apiUrl = import.meta.env.VITE_API_URL;
const ReviewDonor = () => {
  const [errors, setErrors] = useState(null);
  const { number } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isTrue, setIsTrue] = useState(false);
  const { setIsLoading } = useLoading();
  const [donorDetails, setDonorDetails] = useState(null);
  const [reviewMessage, setReviewMessage] = useState({
    image: "",
    bloodGroup: "",
    address: "",
    message: "",
    mobile: "",
    womenNumber: "",
    name: "",
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
        localStorage.removeItem("mobile");
        localStorage.removeItem("token");
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

      if (data.mobile) {
        setDonorDetails(data);
        setReviewMessage({
          ...reviewMessage,
          image: data.image,
          bloodGroup: data.bloodGroup,
          address: data.presentAddress.address,
          message: "",
          mobile: data.mobile,
          womenNumber: data.womenNumber,
          name: data.name,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReview = async () => {
    const { image, bloodGroup, address, message, mobile, womenNumber, name } =
      reviewMessage;
    const validationErrors = {};
    if (!reviewMessage.message.trim()) {
      validationErrors.message = "আপনার মতামত লিখুন।";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/pre-review`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
            bloodGroup,
            address,
            message,
            mobile,
            womenNumber,
            name,
          }),
        });
        const data = await res.json();
        setReviewMessage({ message: "" });
        if (data.mobile || data.womenNumber) {
          setIsTrue(true);
        }
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getReview = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/main-review/${number}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.mobile || data.womenNumber) {
        setIsTrue(true);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);
  useEffect(() => {
    getDonorDetails();
  }, []);
  useEffect(() => {
    getReview();
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
              মতামত:
            </h1>
            <div className="w-full flex flex-col">
              {errors && errors.message ? (
                <span className="text-xs text-maincolor flex items-center gap-1 ml-1 mt-2">
                  <RiAlertLine className="text-sm" />
                  {errors.message}
                </span>
              ) : (
                ""
              )}
              <textarea
                name="note"
                id=""
                disabled={isTrue ? true : false}
                onChange={(e) => {
                  setReviewMessage({
                    ...reviewMessage,
                    message: e.target.value,
                  });
                }}
                value={reviewMessage.message}
                placeholder={
                  isTrue
                    ? "আপনি ইতোমধ্যে একটি মতামত আমাদের নিকট জমা দিয়েছেন।যা ওয়েবসাইটে প্রদর্শিত রয়েছে। আপনি চাইলে আমাদের ফেসবুক গ্রুপে পোস্ট করতে পারেন। ধন্যবাদ...!"
                    : "প্রাণরক্ত সম্পর্কে আপনার কোনো মতামত থাকলে আমাদের জানাতে পারেন। "
                }
                className="w-full   border border-slate-300 rounded-md p-3 outline-none min-h-[250px] resize-none text-sm"
              ></textarea>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-3 mt-3">
              <button
                onClick={handleReview}
                disabled={isTrue ? true : false}
                className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                type="submit"
              >
                জমা দিন
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDonor;
