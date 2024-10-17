import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
import { useNavigate } from "react-router";
const apiUrl = import.meta.env.VITE_API_URL;
const ChatBox = () => {
  const number = localStorage.getItem("mobile");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const { setIsLoading } = useLoading();
  const [donorDetails, setDonorDetails] = useState([]);
  const messageBoxRef = useRef(null); // Reference for the message box

  const [chat, setChat] = useState({
    name: "",
    image: "",
    mobile: "",
    message: "",
  });
  const getDonorDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/donor/${number}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.mobile) {
        setChat({
          ...chat,
          name: data.name,
          image: data.image,
          mobile: data.mobile,
        });
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChat = async () => {
    const { name, mobile, image, message } = chat;
    const validationErrors = {};
    if (!chat.message.trim()) {
      validationErrors.message = "আপনার ম্যাসেজ লিখুন";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length == 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/chatbox`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobile,
            image,
            message,
          }),
        });
        const data = await res.json();
        setChat({
          message: "",
        });
        if (data.mobile) {
          getMessage();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getMessage = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/chatbox`, {
        method: "GET",
      });
      const data = await res.json();
      if (data) {
        setDonorDetails(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
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
        setIsTrue(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);
  useEffect(() => {
    getDonorDetails();
  }, []);
  useEffect(() => {
    getMessage();
  }, []);
  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [donorDetails]);
  return (
    <section className="container mx-auto p-3 h-screen">
      <div className="chat-box w-full min-h-[80vh] h-[100%] border-black border-2 rounded-sm relative  flex flex-col items-center p-5">
        <div
          className="message-box w-full h-[80%] overflow-scroll pt-5 space-y-10 mb-5"
          ref={messageBoxRef}
        >
          {donorDetails.length < 1 ? "কোনো ম্যাসেজ নেই" : ""}
          {donorDetails
            ? donorDetails.map((donor, index) => {
                const { name, image, message, mobile } = donor;

                return (
                  <div className="h-auto flex items-end gap-2" key={index}>
                    <span
                      onClick={() => {
                        navigate(`/donors/${mobile}`);
                      }}
                      className="w-[40px] h-[40px] bg-red-900 block rounded-full overflow-hidden cursor-pointer"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className=" bg-slate-700 text-white p-3 rounded-lg text-sm max-w-[85%] md:max-w-[400px] relative">
                      <span className=" absolute left-0 -top-5 text-black text-sm font-bold min-w-[200px]">
                        {name}
                      </span>
                      {message}
                    </span>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="message-input w-full flex items-center h-[20%] relative">
          {errors && errors.message ? (
            <span className="absolute  top-3 w-full text-center flex items-center justify-center text-maincolor">
              <RiAlertLine className="text-sm" />
              <span className="text-sm">{errors.message}</span>
            </span>
          ) : (
            ""
          )}
          {!number ? (
            <span className="absolute  top-3 w-full text-center flex items-center justify-center text-maincolor">
              <RiAlertLine className="text-sm" />
              <span className="text-sm">
                {"ম্যাসেজ করতে হলে অবশ্যই লগইন থাকতে হবে"}
              </span>
            </span>
          ) : (
            ""
          )}
          <textarea
            value={chat.message}
            disabled={isTrue ? true : false}
            onChange={(e) => {
              setChat({ ...chat, message: e.target.value });
              setErrors("");
            }}
            className="message-input  w-full h-full bg-gray-50 resize-none p-3 pr-10 outline-none border-2 border-black rounded-lg"
          ></textarea>
          <button
            disabled={isTrue ? true : false}
            onClick={handleChat}
            className="absolute right-5 cursor-pointer"
          >
            <IoSend className="text-3xl hover:text-maincolor" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
