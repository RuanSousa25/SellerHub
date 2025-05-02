export const saveDockBatch = async (api, ids, dock) => {
  return api.post("/vtex/batch/logistics/docks/", { ids, dock });
};
