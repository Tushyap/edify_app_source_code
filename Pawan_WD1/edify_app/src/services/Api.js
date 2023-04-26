import axios from "axios";

const API_URL = "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete config.headers.common["Authorization"];
  }

  return config;
});

export default apiClient;