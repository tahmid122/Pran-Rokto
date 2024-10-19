import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminPanel = () => {
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
    <section className="container mx-auto p-3 w-full min-h-screen">
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
      <div className="mt-[200px]">
        <h1 className="font-bold text-3xl text-center">ওয়েলকাম এডমিন...!</h1>
      </div>
    </section>
  );
};

export default AdminPanel;
