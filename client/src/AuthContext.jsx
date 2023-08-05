import React, { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    // Additional logic for login if needed
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Additional logic for logout if needed
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
