// src/services/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  // baseURL: "https://sweetshop-backend.onrender.com/api",
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default api;
