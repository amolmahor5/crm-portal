// hooks/useAuth.js
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("cognitoEntryToken");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};
