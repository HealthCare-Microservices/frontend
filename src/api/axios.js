import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8200", // Patient microservice base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
