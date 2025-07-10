// ...existing code...
// filepath: c:\Users\amolm\OneDrive\Desktop\crm-portal\frontend\src\api.js

import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

console.log("API_URL----", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ==================== AUTH APIs ====================

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

// ==================== ORGANIZATION APIs ====================

// Get all organizations (admin only)
export function getOrganizations() {
  return axiosInstance.get("/organizations");
}

// Create new organization (admin only)
export function createOrganization(data) {
  return axiosInstance.post("/organizations", data);
}

// Get single organization by ID
export function getOrganization(id) {
  return axiosInstance.get(`/organizations/${id}`);
}

// Update organization (admin only)
export function updateOrganization(id, data) {
  return axiosInstance.put(`/organizations/${id}`, data);
}

// Delete organization (admin only)
export function deleteOrganization(id) {
  return axiosInstance.delete(`/organizations/${id}`);
}

// Update organization subscription plan (admin only)
export function updateOrganizationSubscription(id, subscriptionPlan) {
  return axiosInstance.put(`/organizations/${id}/subscription`, {
    subscriptionPlan,
  });
}
