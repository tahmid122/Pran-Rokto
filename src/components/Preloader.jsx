// Preloader.jsx
import React from "react";
import { ripples } from "ldrs";

const Preloader = () => {
  ripples.register();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <l-ripples size="150" speed="2" color="#ED0404"></l-ripples>
    </div>
  );
};

export default Preloader;
