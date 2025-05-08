import * as authApi from "../api/authApi";
import { useApiClient } from "./useApiClient";

export const useAuthApi = () => {
  const api = useApiClient(false);

  const exchangeToken = async (code) => await authApi.exchangeToken(api, code);
  const validityToken = async (token) =>
    await authApi.validityToken(api, token);
  return {
    exchangeToken,
    validityToken,
  };
};
