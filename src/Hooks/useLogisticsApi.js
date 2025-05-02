import * as logisticsApi from "../api/logisticsApi";
import { useApiClient } from "./useApiClient";

const useLogisticsApi = () => {
  const api = useApiClient();

  const saveDockBatch = async (ids, dock) =>
    await logisticsApi.saveDockBatch(api, ids, dock);

  return { saveDockBatch };
};
export default useLogisticsApi;
