import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "./LoadingContexts";
const apiUrl = import.meta.env.VITE_API_URL;
const ManageDonateDate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoading();
  const today = new Date().toISOString().split("T")[0];
  const { number } = useParams();
  const [manageDate, setManageDate] = useState(null);
  const [note, setNote] = useState();
  const [donorDetails, setDonorDetails] = useState(null);
  const [date, setDate] = useState(null);
  const [donorNotes, setDonorNotes] = useState("");
  const [dayDifference, setDayDifference] = useState("");
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
      setDonorDetails(data);
      if (data.lastDonationDate) {
        const formatedDate = new Date(data.lastDonationDate)
          .toISOString()
          .split("T")[0];
        setDate(formatedDate);
        setManageDate(formatedDate);
        //
        const formatedDates = new Date(formatedDate);
        const today = new Date();
        const timeDiff = today.getTime() - formatedDates.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDayDifference(dayDiff);
      }
      setDonorNotes(data.note);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/manage-date/${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: manageDate,
          note: note,
        }),
      });
      const data = await res.json();
      if (data.lastDonationDate) {
        navigate(`/profile/${data.mobile}`);
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
    getVerified();
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
        <div className="w-[100%]">
          <div className="w-[100%] flex flex-col items-center justify-center gap-5 p-3 shadow-md rounded-sm border-t-4 border-[#ED0404]">
            <h1 className="text-[#ED0404] font-bold text-xl border-b-2 border-[#ED0404] border-dashed pb-2 w-full text-center">
              ম্যানেজ ডোনেট ডেট:
            </h1>
            <form onSubmit={handleSubmit} action="" className="space-y-3">
              <div className="w-full flex flex-col items-center justify-center gap-3 mt-3">
                <div className="flex items-center gap-2 flex-col">
                  <h2 className="font-bold">সর্বশেষ রক্তদানের তারিখ: {date}</h2>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">({dayDifference}</span> দিন আগে)
                  </div>
                </div>
                <input
                  type="date"
                  className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm w-full lg:w-[50%]"
                  max={today}
                  defaultValue={manageDate}
                  onChange={(e) => {
                    setManageDate(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center flex-col gap-2">
                  <h1 className="font-bold">ডোনেশন নোট</h1>
                  <p className="text-sm text-center mb-2">
                    যেমনঃ আপনি শুধু শুক্রবার রক্তদিতে পারবেন, তাহলে আপনাকে অন্য
                    দিনে কেউ বিরক্ত করবে না! এমন কোনো অসুবিধা থাকলে এখানে লিখে
                    দিন।
                  </p>
                  <textarea
                    name="note"
                    id=""
                    placeholder="নোট লিখুন"
                    className="w-full   border border-slate-300 rounded-md p-3 outline-none min-h-[150px] resize-none text-sm"
                    defaultValue={donorNotes}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>
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

export default ManageDonateDate;
