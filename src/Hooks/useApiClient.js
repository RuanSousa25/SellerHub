import axios from "axios";
import createApiClient from "../api/apiClient";
import { useAuth } from "../Context/AuthContext";

export const useApiClient = () => {
  const { appKey, appToken } = useAuth();

  return createApiClient(appKey, appToken);
};
