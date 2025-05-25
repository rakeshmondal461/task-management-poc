import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "./constants";

// Create Axios instance with typed configuration
const ApiRequest: any = axios.create({
  baseURL: API_BASE_URL, // Adjust baseURL as per your API
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
ApiRequest.interceptors.request.use(
  (config: any) => {
    // Skip adding token for signup and signin endpoints
    const isAuthEndpoint = ["/signup", "/signin"].some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isAuthEndpoint) {
      const token: string | null = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default ApiRequest;