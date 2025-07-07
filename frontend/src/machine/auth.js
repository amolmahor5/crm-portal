import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api/v1";

console.log("API_URL----", API_URL)

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Register new user
export function register(data) {
    return axiosInstance.post("/auth/register", data);
}

// User login
export function login(data) {
    return axiosInstance.post("/auth/login", data);
}

// Get current user
export function getMe() {
    return axiosInstance.get("/auth/me");
}

// Update user details
export function updateDetails(data) {
    return axiosInstance.put("/auth/updatedetails", data);
}

// Update password
export function updatePassword(data) {
    return axiosInstance.put("/auth/updatepassword", data);
}

// Forgot password
export function forgotPassword(email) {
    return axiosInstance.post("/auth/forgotpassword", { email });
}

// Reset password
export function resetPassword(token, password) {
    return axiosInstance.put(`/auth/resetpassword/${token}`, { password });
}

// Logout user
export function logout() {
    return axiosInstance.get("/auth/logout");
}