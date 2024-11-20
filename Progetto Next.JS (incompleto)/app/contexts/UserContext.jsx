"use client";
import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children, currentUser }) => {
  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(UserContext);
};
