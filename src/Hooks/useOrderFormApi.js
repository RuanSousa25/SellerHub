import { useApiClient } from "./useApiClient";
import * as orderFormApi from "../api/orderFormApi";

export const useOrderFormApi = () => {
  const api = useApiClient();

  const patchOrderForm = async (ids, operations) =>
    await orderFormApi.patchOrderFormBatch(api, ids, operations);

  return { patchOrderForm };
};
