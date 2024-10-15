import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ".././assets/images/default.png";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
const NavBar = () => {
  const [isTrue, setIsTrue] = useState(false);
  const mobile = localStorage.getItem("mobile");
  const location = useLocation();
  const isProfileRoute = location.pathname.includes("profile");
  return (
    <nav className="shadow-md px-3 sticky top-0 left-0 bg-white z-50">
      <div className="relative mx-auto py-5 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <img
              src="/favicon.png"
              alt="PranRokto"
              className="h-[50px] w-auto"
            />
            <div className="text-black">
              <span className="block text-3xl font-bold text-center text-red">
                প্রাণরক্ত
              </span>
              <span className="italic font-bold text-sm tracking-widest">
                প্রাণ বাঁচানোর প্রতিশ্রুতি
              </span>
            </div>
          </div>
        </Link>
        <ul
          className={`flex items-left justify-center gap-5 font-bold fixed top-0 left-0 min-h-[100vh] flex-col w-[50%] px-3 shadow-md ${
            isTrue ? "translate-x-[0%]" : "translate-x-[-100%]"
          } transition-all duration-500 lg:translate-x-[0%] lg:flex-row lg:min-h-[100%] lg:w-[auto] lg:relative lg:bg-transparent lg:shadow-none bg-white z-50`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                  : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
              }
              onClick={() => {
                setIsTrue(false);
              }}
            >
              হোম
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donors"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                  : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
              }
              onClick={() => {
                setIsTrue(false);
              }}
            >
              রক্তদাতা
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                  : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
              }
              onClick={() => {
                setIsTrue(false);
              }}
            >
              আমাদের সম্পর্কে
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                  : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
              }
              onClick={() => {
                setIsTrue(false);
              }}
            >
              যোগাযোগ
            </NavLink>
          </li>
          <li>
            {isProfileRoute ? (
              <NavLink
                to={mobile ? `/profile/${mobile}` : "/login"}
                className={() =>
                  isProfileRoute
                    ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                    : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
                }
                onClick={() => {
                  setIsTrue(false);
                }}
              >
                {mobile ? "প্রোফাইল" : "লগইন"}
              </NavLink>
            ) : (
              <NavLink
                to={mobile ? `/profile/${mobile}` : "/login"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                    : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500"
                }
                onClick={() => {
                  setIsTrue(false);
                }}
              >
                {mobile ? "প্রোফাইল" : "লগইন"}
              </NavLink>
            )}
          </li>
          <li>
            {mobile ? (
              ""
            ) : (
              <NavLink
                to="/registration"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
                    : "hover:bg-[#ED0404] bg-black text-white p-2 rounded-md hover:text-white transition-all duration-500"
                }
                onClick={() => {
                  setIsTrue(false);
                }}
              >
                রেজিস্ট্রেশন
              </NavLink>
            )}
          </li>
        </ul>
        <div className="lg:hidden">
          {isTrue ? (
            <FaXmark
              className="text-3xl cursor-pointer"
              onClick={() => {
                setIsTrue(false);
              }}
            />
          ) : (
            <FaBars
              className="text-3xl cursor-pointer"
              onClick={() => {
                setIsTrue(true);
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
