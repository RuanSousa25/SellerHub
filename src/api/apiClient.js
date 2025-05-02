import axios from "axios";

const createApiClient = (appKey, appToken) => {
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (appKey && appToken) {
    client.interceptors.request.use((config) => {
      config.headers["X-VTEX-API-AppKey"] = appKey;
      config.headers["X-VTEX-API-AppToken"] = appToken;
      return config;
    });
  }

  return client;
};
export default createApiClient;
