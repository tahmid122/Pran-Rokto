import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Donors from "./components/Donors";
import DonorDetails from "./components/DonorDetails";
import Profile from "./components/Profile";
import Error404 from "./components/Error404";
import ManageDonateDate from "./components/ManageDonateDate";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import UpdateProfilePhoto from "./components/UpdateProfilePhoto";
import ForgetPassword from "./components/ForgetPassword";
import { LoadingProvider, useLoading } from "./components/LoadingContexts";
import Preloader from "./components/Preloader";
import WomenProtection from "./components/WomenProtection";
import ProfilePhoto from "./components/ProfilePhoto";
import ScrollToTop from "./components/ScrollToTop";
import ChatBox from "./components/ChatBox";
import ReviewDonor from "./components/ReviewDonor";
import AdminPanel from "./components/AdminPanel";
import AdminReview from "./components/AdminReview";
import AdminChangePassDonor from "./components/AdminChangePassDonor";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <LoadingProvider>
      <MainApp />
    </LoadingProvider>
  );
}

function MainApp() {
  const { isLoading } = useLoading(); // Now this works because LoadingProvider is outside

  return (
    <>
      {isLoading && <Preloader />} {/* Show Preloader when loading */}
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/chat-box" element={<ChatBox />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/changed-password" element={<AdminChangePassDonor />} />
          <Route path="/admin-review" element={<AdminReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-women-donor" element={<WomenProtection />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/donors/:number" element={<DonorDetails />} />
          <Route path="/profile-photo/:number" element={<ProfilePhoto />} />
          <Route path="/profile/:number" element={<Profile />} />
          <Route path="/profile/review/:number" element={<ReviewDonor />} />
          <Route
            path="/profile/manage-donate-date/:number"
            element={<ManageDonateDate />}
          />
          <Route
            path="/profile/change-password/:number"
            element={<ChangePassword />}
          />
          <Route path="/profile/update/:number" element={<UpdateProfile />} />
          <Route
            path="/profile/update/photo/:number"
            element={<UpdateProfilePhoto />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
