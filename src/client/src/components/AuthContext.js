import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle token expiration or logout
  const handleLogout = async () => {
    // Remove token from local storage or wherever you're storing it
    localStorage.removeItem('jwtToken');
    // Clear authentication state
    setIsAuthenticated(false);
    setUser(null);
    // Perform additional logout actions (e.g., redirect to login page)
  };

  // Verify token on initial render (and maybe periodically)
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Verify token using your server-side verification function
    //   verifyToken(token)
    //     .then((decoded) => {
    //       setIsAuthenticated(true);
    //       setUser(decoded.user);
    //     })
    //     .catch((error) => {
    //       console.error("Token verification error:", error);
    //       if (error.name === 'TokenExpiredError') {
    //         handleLogout();
    //       }
        // });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;