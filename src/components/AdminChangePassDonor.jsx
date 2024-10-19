import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminChangePassDonor = () => {
  const [details, setDetails] = useState({ number: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/changed-password/${details.number}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: details.password,
      }),
    });
    const data = await res.json();
    if (data.msg) {
      alert(data.msg);
    }
  };
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  //verify user
  const getVerified = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 401) {
        // Check if the token is invalid or unauthorized
        localStorage.removeItem("mobile");
        localStorage.removeItem("token");
        navigate("/admin-login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);
  return (
    <section className="container mx-auto p-3 w-full min-h-[82vh] flex items-center flex-col gap-10">
      <nav className=" flex items-center justify-center gap-3 w-full font-bold">
        <Link to={"/admin-review"}>রিভিউ</Link>
        <Link to={"/changed-password"}>চেঞ্জ পাসওয়ার্ড</Link>
        <Link
          onClick={() => {
            localStorage.removeItem("mobile");
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          লগ আউট
        </Link>
      </nav>
      <h1 className="bg-[#ED0404]  text-center text-white font-bold text-2xl h-[60px] flex items-center justify-center p-2 rounded-md ">
        ডোনার পাসওয়ার্ড চেঞ্জ
      </h1>
      <form className="w-[50%]" onSubmit={handleSubmit}>
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
              onChange={(e) => {
                setDetails({ ...details, number: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label
              htmlFor="পাসওয়ার্ড"
              className="text-md mb-2 after:content-['*'] after:ml-1 after:text-[#ED0404] after:font-bold"
            >
              নতুন পাসওয়ার্ড
            </label>
            <input
              type="password"
              className="border border-slate-300 rounded-md h-[40px] py-2 px-2 focus:border-[#ED0404] outline-none text-sm"
              placeholder="পাসওয়ার্ড"
              name="password"
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
              }}
            />
          </div>

          <div className="flex items-center justify-between  w-[100%] h-[100%] mb-5">
            <button
              className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
              type="submit"
            >
              চেঞ্জ পাসওয়ার্ড
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AdminChangePassDonor;
