import axios from "axios";
import { Base_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: Base_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("expense-tracker-token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Respense Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //Redirect to login page
        localStorage.removeItem("expense-tracker-token");
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
