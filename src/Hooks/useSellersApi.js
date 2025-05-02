import * as sellersApi from "../api/sellersApi";
import { useApiClient } from "./useApiClient";

export const useSellersApi = () => {
  const api = useApiClient();

  const getSellersList = async () => await sellersApi.getSellersList(api);

  return { getSellersList };
};
