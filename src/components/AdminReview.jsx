import React, { useEffect, useState } from "react";
import { useLoading } from "./LoadingContexts";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminReview = () => {
  const { setIsLoading } = useLoading();
  const [allreviews, setAllReviews] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const getReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/pre-review`, {
        method: "GET",
      });
      const data = await res.json();
      setAllReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (mobile) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/pre-review/${mobile}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.msg) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleApprove = async (review) => {
    const { image, bloodGroup, address, message, mobile, womenNumber, name } =
      review;
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/main-review`, {
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

      if (data.message) {
        handleDelete(mobile);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
  useEffect(() => {
    getReviews();
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
      <h1 className="font-bold text-2xl">পেন্ডিং রিভিউসমূহ</h1>
      <div className="flex items-center">
        {allreviews &&
          allreviews.map((review, index) => {
            const { image, bloodGroup, address, message, mobile, name } =
              review;
            return (
              <div
                key={index}
                className="item ml-2 text-center shadow-md p-3  border-2 border-black h-[500px] rounded-md mx-auto overflow-scroll w-[30%]"
              >
                <div className="flex justify-center gap-2 mb-2">
                  <button
                    onClick={() => {
                      handleApprove(review);
                    }}
                    className=" bg-black px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                    type="submit"
                  >
                    গ্রহণ করুন
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(mobile);
                    }}
                    className=" bg-[#ED0404] px-3 py-2 text-white font-bold rounded-md hover:bg-white hover:text-[#ED0404] transition-all duration-500 border border-[#ED0404]"
                    type="submit"
                  >
                    বাতিল করুন
                  </button>
                </div>
                <div className="caro-image w-[150px] h-[150px] rounded-full overflow-hidden mx-auto mb-3">
                  <img src={image} alt="" className="object-cover" />
                </div>
                <div className="caro-title text-center mb-3">
                  <span className="text-lg font-bold">
                    {name}, {bloodGroup}
                  </span>
                  <br />
                  <span>{address}</span>
                </div>
                <div className="caro-desc text-md p-1">
                  <p>{message}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default AdminReview;
