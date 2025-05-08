import axios from "axios";

const createApiClient = (jwtToken) => {
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (jwtToken) {
    client.interceptors.request.use((config) => {
      config.headers["Authorization"] = "Bearer " + jwtToken;

      return config;
    });
  }

  return client;
};
export default createApiClient;
