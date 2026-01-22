import axios from "axios";

// Use environment variable for production, fallback to proxy for development
const API_URL = process.env.REACT_APP_API_URL || "";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
