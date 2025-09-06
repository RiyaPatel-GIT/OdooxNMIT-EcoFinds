import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
