import axios from "axios";

export const apiClientDoctor = axios.create({
  baseURL: "http://localhost:8200", // doctor microservice base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientPatient = axios.create({
  baseURL: "http://localhost:8201", // Patient microservice base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientAppointment = axios.create({
  baseURL: "http://localhost:8202", // appointment microservice base URL
  headers: {
    "Content-Type": "application/json",
  },
});

