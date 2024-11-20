"use client";
import { createContext, useState, useContext } from 'react';

// Crea il contesto
const LoadingContext = createContext();

// Crea il provider per gestire lo stato 'loading'
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // lo stato booleano iniziale

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook per utilizzare il contesto in modo semplice
export const useLoading = () => useContext(LoadingContext);
