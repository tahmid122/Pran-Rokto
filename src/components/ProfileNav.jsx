import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { NavLink, useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
const ProfileNav = () => {
  const { number } = useParams();
  return (
    <div className="min-w-[300px] border-l-4 border-[#ED0404] p-5 rounded-sm lg:fixed lg:left-3 lg:top-32 z-30 bg-white">
      <ul className="flex flex-col justify-center gap-0">
        <NavLink
          to={`/profile/${number}`}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <FaUser /> <span className="">প্রোফাইল</span>
          </li>
        </NavLink>
        <NavLink
          to={`/profile/update/${number}`}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <GrUpdate /> <span className="">আপডেট প্রোফাইল</span>
          </li>
        </NavLink>
        <NavLink
          to={`/profile/update/photo/${number}`}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <GrUpdate /> <span className="">চেঞ্জ প্রোফাইল ফটো</span>
          </li>
        </NavLink>
        <NavLink
          to={`/profile/manage-donate-date/${number}`}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <FaCalendarAlt />
            <span>ম্যানেজ ডোনেট ডেট</span>
          </li>
        </NavLink>
        <NavLink
          to={`/profile/review/${number}`}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <FaCommentAlt />
            <span>মতামত</span>
          </li>
        </NavLink>
        <NavLink
          to={`/profile/change-password/${number}`}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
        >
          <li className="flex gap-2 items-center">
            <FaLock />
            <span>চেঞ্জ পাসওয়ার্ড</span>
          </li>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ED0404] text-white p-2 rounded-md transition-all duration-500"
              : "hover:bg-[#ED0404] p-2 rounded-md hover:text-white transition-all duration-500 my-[1px]"
          }
          onClick={() => {
            localStorage.removeItem("mobile");
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          <li className="flex gap-2 items-center">
            <FaArrowRightFromBracket />
            <span>লগ আউট</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default ProfileNav;
