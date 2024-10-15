// GlobalPreloader.js
import React, { useContext } from "react";
import { LoadingContext } from "./LoadingContext";
import "ldrs/ring";
import { quantum } from "ldrs";
const GlobalPreloader = () => {
  const { isLoading } = useContext(LoadingContext);
  quantum.register();
  if (!isLoading) return null;

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
      <l-quantum size="150" speed="3" color="#4BF104"></l-quantum>
    </div>
  );
};

export default GlobalPreloader;
