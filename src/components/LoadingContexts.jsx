import React, { createContext, useContext, useState } from "react";

// Create context
const LoadingContext = createContext();

// Create custom hook to use the context
export const useLoading = () => useContext(LoadingContext);

// Create provider component to wrap the app
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
