// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "http://localhost:5000/api",
  // baseURL: "https://sweetshop-backend.onrender.com/api",
  // baseURL: "https://incubyte-website.vercel.app/api",
});

export default api;
