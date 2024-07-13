import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// ? REQUESTS
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// ? RESPONSES
instance.interceptors.response.use(
  (config) => {
    console.log(config);

    return config;
  },
  (error) => {
    console.log("REJECTED", error.response.data);
    return Promise.reject(error);
  }
);

export default instance;
