import axios from "axios";
import createApiClient from "../api/apiClient";
import { useAuth } from "../Context/AuthContext";

export const useApiClient = (useAuthorization = true) => {
  if (useAuthorization) {
    const { getToken } = useAuth();
    return createApiClient(getToken());
  }
  return createApiClient(null);
};
