import React from "react";
import { FaFacebook, FaWhatsapp, FaPhoneAlt, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="container mx-auto py-3 flex flex-col items-center justify-start pt-20 gap-20">
      <div className="flex flex-col gap-3">
        <div className="relative w-[280px] h-[300px]  sm:h-[300px] sm:w-[280px]  bg-white border-4 border-black rounded-lg">
          <div className="absolute w-[280px] h-[300px]  sm:bottom-10 sm:right-10 sm:h-[300px] sm:w-[280px]  bg-blue-500 border-4 border-black rounded-lg -rotate-6">
            <img
              src="/profile-pic.png"
              alt="AdminImage"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-center text-xl">তাহমিদ আলম</h1>
          <p className="text-sm text-center italic">ডেভেলপার প্রাণরক্ত.কম</p>
        </div>
        <div className="flex justify-around items-center">
          <a href="https://www.facebook.com/TahmidAlamJG" target="_blank">
            <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
          <a href="https://wa.link/zo4pc4" target="_blank">
            <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
          <a href="tel:+8801318195591">
            <FaPhoneAlt className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
          <a href="https://www.linkedin.com/in/tahmidalam122/" target="_blank">
            <FaLinkedin className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
          </a>
        </div>
      </div>

      {/* Profile Cards Section */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Card 1 */}
        <div className="w-[300px] lg:w-[300px] flex-shrink-0 flex flex-col gap-3 shadow-lg rounded-lg overflow-hidden">
          <div className="h-[250px] bg-white">
            <img
              src="https://wallpapers.com/images/hd/anime-girl-profile-pictures-k0gnegcpqni3z1ua.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-center text-xl">দেবাশীষ রায়</h1>
            <p className="text-sm text-center italic">উপদেষ্টা, প্রাণরক্ত.কম</p>
          </div>
          <div className="flex justify-around items-center pb-5">
            <a href="#">
              <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaPhoneAlt className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaLinkedin className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-[300px] lg:w-[300px] flex-shrink-0 flex flex-col gap-3 shadow-lg rounded-lg overflow-hidden">
          <div className="h-[250px] bg-white">
            <img
              src="https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-an-anime-girl-wearing-a-black-top-with-long-dark-hair-image_2676166.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-center text-xl">ফিরোজ প্রামাণিক</h1>
            <p className="text-sm text-center italic">মডারেটর, প্রাণরক্ত.কম</p>
          </div>
          <div className="flex justify-around items-center pb-5">
            <a href="#">
              <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaPhoneAlt className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaLinkedin className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-[300px] lg:w-[300px] flex-shrink-0 flex flex-col gap-3 shadow-lg rounded-lg overflow-hidden">
          <div className="h-[250px] bg-white">
            <img
              src="https://preview.redd.it/j2ink51mnxz51.jpg?auto=webp&s=040889cb6a1bfa825a4736afa128421009ba12a6"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-center text-xl">মুনছিফা রুহানী</h1>
            <p className="text-sm text-center italic">মডারেটর, প্রাণরক্ত.কম</p>
          </div>
          <div className="flex justify-around items-center pb-5">
            <a href="#">
              <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaPhoneAlt className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaLinkedin className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-[300px] lg:w-[300px] flex-shrink-0 flex flex-col gap-3 shadow-lg rounded-lg overflow-hidden">
          <div className="h-[250px] bg-white">
            <img
              src="https://img.freepik.com/premium-photo/beautiful-anime-girl-profile-dark-gray-background_864588-33913.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-center text-xl">আবরার কবীর</h1>
            <p className="text-sm text-center italic">মডারেটর, প্রাণরক্ত.কম</p>
          </div>
          <div className="flex justify-around items-center pb-5">
            <a href="#">
              <FaFacebook className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaPhoneAlt className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
            <a href="#">
              <FaLinkedin className="text-2xl cursor-pointer hover:text-[#ED0404] transition-all duration-150" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
