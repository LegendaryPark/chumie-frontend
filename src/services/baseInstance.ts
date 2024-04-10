// src/axios.js

import axios from "axios";
import { loadState } from "../utils/storage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5500/",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = loadState("jwt");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
