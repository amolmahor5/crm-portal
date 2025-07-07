// hooks/useAuth.js
import { useState, useEffect } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        // const token = true;
        setIsAuthenticated(!!token);
    }, []);

    return { isAuthenticated };
};
