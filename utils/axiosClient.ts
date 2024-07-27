import axios from "axios";

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000, // Set a timeout limit
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (e.g., redirect to login)
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
