import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Select from "react-select"; // Import react-select
import { useLoading } from "./LoadingContexts";
import { RiAlertLine } from "react-icons/ri";
const apiUrl = import.meta.env.VITE_API_URL;
const SearchBanner = () => {
  const [errors, setErrors] = useState("");
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [searchInputes, setSearchInputes] = useState({
    bloodGroup: "",
    district: "",
    upazilla: "",
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/univercelData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDistricts(data[0].districts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUpazillas = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/upazilla`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upazilla: id,
        }),
      });
      const data = await res.json();
      setUpazillas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setSearchInputes({ ...searchInputes, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field that is being updated
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bloodGroup, district, upazilla } = searchInputes;
    let validationErrors = {};

    if (!searchInputes.bloodGroup.trim()) {
      validationErrors.bloodGroup = "রক্তের গ্রুপ সিলেক্ট করুন";
    }
    if (!searchInputes.district.trim()) {
      validationErrors.district = "জেলা সিলেক্ট করুন";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/getSearchResult`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bloodGroup,
            district,
            upazilla,
          }),
        });
        const data = await res.json();
        if (data) {
          navigate("/donors", { state: { searchResults: data } });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "45px",
      borderColor: "#ED0404",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ED0404",
      },
      borderRadius: "0.375rem", // Adjust the border radius as needed
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 100,
      backgroundColor: "#ffffff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ED0404" : "#ffffff",
      color: state.isFocused ? "#ffffff" : "#000000",
      "&:active": {
        backgroundColor: "#ED0404",
        color: "#ffffff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black", // Set color with opacity
      opacity: 1, // Change opacity (not necessary if using rgba)
    }),
  };

  // Options for blood groups
  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  // Options for districts
  const districtOptions = districts
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((district) => ({
      value: district.id,
      label: `${district.bn_name} - ${district.name}`,
    }));

  // Options for upazillas
  const upazillaOptions = upazillas.map((upazilla) => ({
    value: upazilla.bn_name,
    label: `${upazilla.bn_name} - ${upazilla.name}`,
  }));

  return (
    <section className="py-5 px-8 relative min-h-[85vh] bg-[url('/public/backgrund.avif')] bg-center bg-black">
      <div className="w-[100%] min-h-[85vh] bg-[#0000006f] absolute top-0 left-0"></div>
      <div className=" w-[100%] min-h-[85vh] absolute top-0 left-0 py-5 px-8 flex items-center justify-center">
        <div className="w-[90%] lg:w-[30%] md:w-[40%] container mx-auto">
          <div className="border-b-4 border-dashed">
            <h1 className="text-3xl font-extrabold border-spacing-2 pb-3 text-white text-center">
              রক্তদাতা খুঁজুন
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {/* Blood Group Select */}
              <Select
                options={bloodGroupOptions}
                placeholder="রক্তের গ্রুপ সিলেক্ট করুন"
                className="font-bold"
                styles={customStyles}
                onChange={(selectedOption) =>
                  handleChange("bloodGroup", selectedOption.value)
                }
              />
              {errors.bloodGroup ? (
                <span className="text-xs text-white flex items-center gap-1 ml-1">
                  <RiAlertLine className="text-sm" />
                  {errors.bloodGroup}
                </span>
              ) : (
                ""
              )}
              {/* District Select with search */}
              <Select
                options={districtOptions}
                placeholder="জেলা সিলেক্ট করুন"
                className="text-sm"
                styles={customStyles}
                onChange={(selectedOption) => {
                  handleChange("district", selectedOption.value);
                  getUpazillas(selectedOption.value);
                }}
              />
              {errors.district ? (
                <span className="text-xs text-white flex items-center gap-1 ml-1">
                  <RiAlertLine className="text-sm" />
                  {errors.district}
                </span>
              ) : (
                ""
              )}
              {/* Upazilla Select */}
              <Select
                options={upazillaOptions}
                placeholder="উপজেলা সিলেক্ট করুন"
                className="text-sm"
                styles={customStyles}
                onChange={(selectedOption) =>
                  handleChange("upazilla", selectedOption.value)
                }
              />
              <button
                type="submit"
                className="bg-[#ED0404] flex justify-center items-center gap-2 w-[100px] mx-auto h-[40px] font-bold text-white rounded-md hover:bg-white hover:text-[#ED0404] border border-[#ED0404] transition-all duration-200"
              >
                <FaMagnifyingGlass />
                খুঁজুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
