import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn');
    setLoggedIn(!!isAuthenticated); 
  }, []);

  const login = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
