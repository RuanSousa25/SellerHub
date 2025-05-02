export const patchOrderFormBatch = async (api, ids, operations) => {
  return api.patch(
    "/vtex/batch/orderform/configuration",
    {
      ids,
      operations,
    },
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};
